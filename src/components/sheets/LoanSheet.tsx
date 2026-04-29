import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2, BadgeCheck } from "lucide-react";
import { formatNaira } from "@/lib/format";
import { toast } from "sonner";

const PRESETS = [5_000, 10_000, 25_000, 50_000];
const PURPOSES = ["Transport", "Rent", "Food", "Data / Airtime", "Personal"];

export const LoanSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [amount, setAmount] = useState(25_000);
  const [purpose, setPurpose] = useState("Transport");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const interest = Math.round(amount * 0.05);

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setDone(true);
    toast.success(`${formatNaira(amount)} disbursed to your wallet.`);
    setTimeout(() => {
      setDone(false);
      onOpenChange(false);
    }, 1400);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[90vh] overflow-y-auto">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent text-accent-foreground self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] w-fit">
                <Sparkles className="h-3 w-3" /> Allawee Advance
              </div>
              <SheetTitle className="font-display text-3xl">Get funded.</SheetTitle>
              <p className="text-sm text-muted-foreground">Approved instantly using your Corps Credit Score. Repaid automatically on next allowance.</p>
            </SheetHeader>

            <div className="mt-6 space-y-6 max-w-lg">
              <div>
                <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground">Amount</label>
                <div className="font-display text-4xl font-semibold tabular mt-2">{formatNaira(amount)}</div>
                <Input
                  type="range" min={1000} max={100_000} step={1000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-3 h-2 p-0 cursor-pointer"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {PRESETS.map((p) => (
                    <button key={p} onClick={() => setAmount(p)}
                      className={`rounded-pill px-3 py-1.5 text-xs font-semibold border transition-colors ${amount === p ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border hover:bg-surface-alt"}`}>
                      {formatNaira(p)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground">Purpose</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {PURPOSES.map((p) => (
                    <button key={p} onClick={() => setPurpose(p)}
                      className={`rounded-pill px-3 py-1.5 text-xs font-semibold border transition-colors ${purpose === p ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border hover:bg-surface-alt"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-surface-alt p-4 space-y-2 text-sm">
                <Row label="Interest (5%)" value={formatNaira(interest)} />
                <Row label="Total repayment" value={formatNaira(amount + interest)} bold />
                <Row label="Due on" value="28 May 2025 · with allowance" />
              </div>

              <Button onClick={submit} disabled={loading} size="lg" className="w-full">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Approving…</> : <>Claim {formatNaira(amount)}</>}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center animate-snap-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
              <BadgeCheck className="h-8 w-8 text-success-foreground" />
            </div>
            <div className="font-display text-2xl mt-4">{formatNaira(amount)} sent to your wallet</div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className={`tabular ${bold ? "font-bold" : "font-semibold"}`}>{value}</span>
  </div>
);
