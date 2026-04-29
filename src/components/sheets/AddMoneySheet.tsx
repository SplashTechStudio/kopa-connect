import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, PiggyBank, BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import { formatNaira } from "@/lib/format";

export const AddMoneySheet = ({ open, onOpenChange, planName }: { open: boolean; onOpenChange: (v: boolean) => void; planName: string }) => {
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleAdd = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setDone(true);
    toast.success(`${formatNaira(Number(amount))} added to ${planName}!`);
    setTimeout(() => {
      onOpenChange(false);
      setDone(false);
      setAmount("");
    }, 2000);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <PiggyBank className="h-5 w-5" />
                </div>
                <div>
                  <SheetTitle className="font-display text-2xl">Add Money</SheetTitle>
                  <p className="text-sm text-muted-foreground">Adding to: <span className="font-semibold text-foreground">{planName}</span></p>
                </div>
              </div>
            </SheetHeader>

            <div className="mt-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Enter Amount (₦)</label>
                <Input 
                  type="number" 
                  placeholder="5000" 
                  value={amount}
                  onChange={e => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  className="h-14 text-2xl font-display font-bold rounded-2xl tabular"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1000, 2000, 5000, 10000].map(p => (
                  <button 
                    key={p} 
                    onClick={() => setAmount(p)}
                    className="py-2 rounded-xl border border-border text-xs font-semibold hover:bg-surface-alt transition-colors"
                  >
                    +{formatNaira(p)}
                  </button>
                ))}
              </div>

              <Button onClick={handleAdd} disabled={loading} size="lg" className="w-full h-12 rounded-xl font-bold">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...</> : `Add ${amount ? formatNaira(Number(amount)) : "Money"}`}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center animate-snap-in">
            <div className="h-16 w-16 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto mb-4">
              <BadgeCheck className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-display font-bold">Success!</h2>
            <p className="text-muted-foreground mt-1">{formatNaira(Number(amount))} has been added to your savings.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
