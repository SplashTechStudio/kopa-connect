import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Users, ShieldCheck, BadgeCheck, Info, 
  ArrowUpRight, PiggyBank, Target, Plus, 
  ChevronRight, Calendar, History 
} from "lucide-react";
import { formatNaira } from "@/lib/format";
import { Progress } from "@/components/ui/progress";
import { AddMoneySheet } from "./AddMoneySheet";

interface SavingsPlan {
  id: string;
  type: "flexible" | "targeted" | "group";
  title: string;
  balance: number;
  interestRate: string;
  nextPayout: string;
  target?: number;
  groupName?: string;
  membersCount?: number;
  rules?: string;
  history?: { id: string; date: string; amount: number; description: string }[];
}

export const SavingsDetailSheet = ({ open, onOpenChange, plan }: { open: boolean; onOpenChange: (v: boolean) => void; plan: SavingsPlan | null }) => {
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);

  if (!plan) return null;

  const isGroup = plan.type === "group";
  const isTargeted = plan.type === "targeted";

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[92vh] overflow-y-auto">
          <SheetHeader className="text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                plan.type === "flexible" ? "bg-blue-50 text-blue-600" : 
                plan.type === "targeted" ? "bg-purple-50 text-purple-600" : 
                "bg-orange-50 text-orange-600"
              }`}>
                {plan.type === "flexible" ? <PiggyBank className="h-6 w-6" /> : 
                 plan.type === "targeted" ? <Target className="h-6 w-6" /> : 
                 <Users className="h-6 w-6" />}
              </div>
              <div>
                <SheetTitle className="font-display text-2xl leading-tight">{plan.title}</SheetTitle>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                  {isGroup ? `Group: ${plan.groupName}` : `${plan.type} savings plan`}
                </p>
              </div>
            </div>
          </SheetHeader>

          <div className="mt-8 space-y-8 max-w-2xl mx-auto">
            {/* Balance Card */}
            <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-6 kw-noise">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
              <div className="relative">
                <div className="text-[10px] uppercase tracking-[0.12em] opacity-70">Current Balance</div>
                <div className="text-4xl font-display font-bold tabular mt-1">{formatNaira(plan.balance)}</div>
                
                {isTargeted && plan.target && (
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="opacity-70">Goal: {formatNaira(plan.target)}</span>
                      <span>{Math.round((plan.balance / plan.target) * 100)}%</span>
                    </div>
                    <Progress value={(plan.balance / plan.target) * 100} className="h-1.5 bg-white/20" />
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => setAddMoneyOpen(true)} className="h-14 rounded-2xl gap-2 font-bold text-base shadow-lg shadow-primary/20">
                <Plus className="h-5 w-5" /> Add Money
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl gap-2 font-bold text-base border-border bg-surface">
                <Calendar className="h-5 w-5" /> Automate
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface-alt border border-border">
                <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Interest Rate</div>
                <div className="text-xl font-bold">{plan.interestRate}</div>
              </div>
              <div className="p-4 rounded-2xl bg-surface-alt border border-border">
                <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Next Payout</div>
                <div className="text-xl font-bold">{plan.nextPayout}</div>
              </div>
              {isGroup && (
                <div className="col-span-2 p-4 rounded-2xl bg-surface-alt border border-border flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Members</div>
                    <div className="text-xl font-bold">{plan.membersCount} Corpers</div>
                  </div>
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-surface bg-primary/10 flex items-center justify-center text-[10px] font-bold">
                        U{i}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Rules (Group only) */}
            {isGroup && plan.rules && (
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2 px-1">
                  <Info className="h-4 w-4" /> Group Rules
                </h4>
                <div className="p-5 rounded-2xl bg-surface-alt border border-border whitespace-pre-wrap text-sm leading-relaxed">
                  {plan.rules}
                </div>
              </div>
            )}

            {/* History */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2 px-1">
                <History className="h-4 w-4" /> Transaction History
              </h4>
              <div className="space-y-3">
                {plan.history && plan.history.length > 0 ? (
                  plan.history.map(h => (
                    <div key={h.id} className="flex items-center gap-3 p-4 rounded-2xl bg-surface-alt border border-border">
                      <div className="h-9 w-9 rounded-full bg-success/10 text-success flex items-center justify-center">
                        <ArrowUpRight className="h-4 w-4 rotate-180" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{h.description}</div>
                        <div className="text-[10px] text-muted-foreground">{h.date}</div>
                      </div>
                      <div className="text-sm font-bold text-success">+{formatNaira(h.amount)}</div>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center rounded-2xl border border-dashed border-border text-muted-foreground">
                    <History className="h-8 w-8 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No transactions yet.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-primary/5 p-5 flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
              <div>
                <div className="font-semibold text-sm">Protected by CorperOne Safetrade</div>
                <p className="text-xs text-muted-foreground mt-1">Your savings are held in an NDIC-insured trust account. Interest is calculated daily and paid monthly.</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AddMoneySheet 
        open={addMoneyOpen} 
        onOpenChange={setAddMoneyOpen} 
        planName={plan.title} 
      />
    </>
  );
};
