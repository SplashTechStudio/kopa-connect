import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Smartphone, BadgeCheck, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const NETWORKS = [
  { id: "mtn", name: "MTN", color: "bg-yellow-400" },
  { id: "airtel", name: "Airtel", color: "bg-red-500" },
  { id: "glo", name: "Glo", color: "bg-green-500" },
  { id: "9mobile", name: "9mobile", color: "bg-green-800" },
];

export const AirtimeSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [network, setNetwork] = useState(NETWORKS[0].id);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setNetwork(NETWORKS[0].id); setPhone(""); setAmount(""); setDone(false);
  };

  const submit = async () => {
    if (!phone || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
    toast.success("Airtime top-up successful!");
    setTimeout(() => { reset(); onOpenChange(false); }, 1500);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[92vh] overflow-y-auto">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent text-accent-foreground self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] w-fit">
                <Smartphone className="h-3 w-3" /> Mobile Recharge
              </div>
              <SheetTitle className="font-display text-3xl">Buy Airtime</SheetTitle>
              <p className="text-sm text-muted-foreground">Top up your line or send credit to a fellow corper.</p>
            </SheetHeader>

            <div className="mt-6 grid gap-5 max-w-2xl mx-auto">
              <Field label="Select Network">
                <div className="grid grid-cols-4 gap-3">
                  {NETWORKS.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setNetwork(n.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                        network === n.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:bg-surface-alt"
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-full ${n.color}`} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{n.name}</span>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Phone Number">
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08012345678" className="h-11 rounded-xl" />
              </Field>

              <Field label="Amount (₦)">
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[200, 500, 1000, 2000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt)}
                      className={`h-10 rounded-xl border text-xs font-semibold tabular transition-all ${
                        amount === amt ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border hover:bg-surface-alt"
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
                <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Other amount" className="h-11 rounded-xl tabular" />
              </Field>

              <div className="rounded-2xl bg-surface-alt p-4 flex items-start gap-3 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">Instant Recharge.</div>
                  <div className="text-muted-foreground mt-0.5">Airtime is sent immediately to the provided number.</div>
                </div>
              </div>

              <Button onClick={submit} disabled={loading} size="lg" className="w-full">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</> : <>Buy Airtime</>}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center animate-snap-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
              <BadgeCheck className="h-8 w-8 text-success-foreground" />
            </div>
            <div className="font-display text-2xl mt-4">Top-up Successful</div>
            <div className="text-sm text-muted-foreground mt-1">Airtime has been sent to {phone}.</div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground mb-1.5 block">{label}</label>
    {children}
  </div>
);
