import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, BadgeCheck } from "lucide-react";
import { formatNaira } from "@/lib/format";
import { toast } from "sonner";

export const TransferSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("5000");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!recipient.trim() || !amount) {
      toast.error("Enter a recipient and amount.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setDone(true);
    toast.success(`${formatNaira(Number(amount))} sent to ${recipient}.`);
    setTimeout(() => { setDone(false); onOpenChange(false); }, 1300);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <SheetTitle className="font-display text-3xl flex items-center gap-2">
                <Send className="h-6 w-6 text-primary" /> Send money
              </SheetTitle>
              <p className="text-sm text-muted-foreground">P2P transfer to any verified Corps Member.</p>
            </SheetHeader>
            <div className="mt-6 space-y-4 max-w-lg">
              <div>
                <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground">Recipient call-up</label>
                <Input className="h-12 mt-1.5 rounded-xl" placeholder="NYSC/LAG/2024/000000" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground">Amount (₦)</label>
                <Input type="number" className="h-12 mt-1.5 rounded-xl text-base" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground">Note (optional)</label>
                <Input className="h-12 mt-1.5 rounded-xl" placeholder="Transport, food, etc." value={note} onChange={(e) => setNote(e.target.value)} />
              </div>
              <Button onClick={submit} disabled={loading} size="lg" className="w-full">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send {formatNaira(Number(amount) || 0)}</>}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center animate-snap-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
              <BadgeCheck className="h-8 w-8 text-success-foreground" />
            </div>
            <div className="font-display text-2xl mt-4">Sent</div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
