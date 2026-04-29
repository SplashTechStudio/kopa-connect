import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, PiggyBank, Target, Users, ShieldCheck, BadgeCheck } from "lucide-react";
import { toast } from "sonner";

type SavingsType = "flexible" | "targeted" | "group";

export const SavingsSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [type, setType] = useState<SavingsType>("flexible");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [target, setTarget] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setType("flexible"); setTitle(""); setAmount(""); setTarget(""); setDone(false);
  };

  const submit = async () => {
    if (!title || !amount || (type === "targeted" && !target)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setDone(true);
    toast.success(`New ${type} savings plan created!`);
    setTimeout(() => { reset(); onOpenChange(false); }, 1500);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[92vh] overflow-y-auto">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent text-accent-foreground self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] w-fit">
                <PiggyBank className="h-3 w-3" /> New Savings Plan
              </div>
              <SheetTitle className="font-display text-3xl">Start your savings journey.</SheetTitle>
              <p className="text-sm text-muted-foreground">Pick a plan that fits your goals. Funds are secure and earn interest daily.</p>
            </SheetHeader>

            <div className="mt-6 grid gap-5 max-w-2xl">
              <div className="grid grid-cols-3 gap-3">
                <SavingsTypeBtn 
                  active={type === "flexible"} 
                  onClick={() => setType("flexible")} 
                  icon={PiggyBank} 
                  label="Flexible" 
                  desc="Withdraw anytime"
                />
                <SavingsTypeBtn 
                  active={type === "targeted"} 
                  onClick={() => setType("targeted")} 
                  icon={Target} 
                  label="Targeted" 
                  desc="Goal-based"
                />
                <SavingsTypeBtn 
                  active={type === "group"} 
                  onClick={() => setType("group")} 
                  icon={Users} 
                  label="Group" 
                  desc="Ajo / Esusu"
                />
              </div>

              <Field label="Plan Name">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={type === "targeted" ? "e.g. New Laptop" : "e.g. Rainy Day Fund"} className="h-11 rounded-xl" />
              </Field>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Initial Deposit (₦)">
                  <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))} placeholder="5000" className="h-11 rounded-xl tabular" />
                </Field>
                {type === "targeted" && (
                  <Field label="Target Amount (₦)">
                    <Input type="number" value={target} onChange={(e) => setTarget(e.target.value === "" ? "" : Number(e.target.value))} placeholder="150000" className="h-11 rounded-xl tabular" />
                  </Field>
                )}
                {type === "group" && (
                  <Field label="Group Name">
                    <Input placeholder="Search for a group or create new" className="h-11 rounded-xl" />
                  </Field>
                )}
              </div>

              <div className="rounded-2xl bg-surface-alt p-4 flex items-start gap-3 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">{type === "flexible" ? "8% p.a. Interest" : type === "targeted" ? "12% p.a. Interest" : "10% p.a. Interest"}</div>
                  <div className="text-muted-foreground mt-0.5">Your funds are protected by NDIC and held in trust by Qreva.</div>
                </div>
              </div>

              <Button onClick={submit} disabled={loading} size="lg" className="w-full">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating Plan...</> : <>Create Savings Plan</>}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center animate-snap-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
              <BadgeCheck className="h-8 w-8 text-success-foreground" />
            </div>
            <div className="font-display text-2xl mt-4">Savings Plan Active</div>
            <div className="text-sm text-muted-foreground mt-1">We've set up your "{title}" plan. You can track it on the savings dashboard.</div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

const SavingsTypeBtn = ({ active, onClick, icon: Icon, label, desc }: { active: boolean; onClick: () => void; icon: any; label: string; desc: string }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
      active ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:bg-surface-alt"
    }`}
  >
    <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
    <div className="text-[10px] font-bold uppercase tracking-wider">{label}</div>
    <div className="text-[8px] text-muted-foreground font-medium truncate w-full text-center">{desc}</div>
  </button>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground mb-1.5 block">{label}</label>
    {children}
  </div>
);
