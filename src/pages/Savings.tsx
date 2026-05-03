import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_SAVINGS } from "@/lib/demo-data";
import { formatNaira } from "@/lib/format";
import { PiggyBank, Target, Users, ArrowUpRight, Plus, ChevronRight, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SavingsSheet } from "@/components/sheets/SavingsSheet";
import { SavingsDetailSheet } from "@/components/sheets/SavingsDetailSheet";

const Savings = () => {
  const [activeTab, setActiveTab] = useState<"all" | "flexible" | "targeted" | "group">("all");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const openDetail = (plan: any) => {
    setSelectedPlan(plan);
    setDetailSheetOpen(true);
  };

  const filteredSavings = activeTab === "all" 
    ? DEMO_SAVINGS 
    : DEMO_SAVINGS.filter(s => s.type === activeTab);

  return (
    <AppShell title="Savings">
      <SavingsSheet open={sheetOpen} onOpenChange={setSheetOpen} />
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">Build your future, one allawee at a time</div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h1 className="font-display text-3xl font-semibold mt-1 cursor-help">Savings & Goals</h1>
              </TooltipTrigger>
              <TooltipContent>
                <p>Manage your savings, set goals, and participate in group savings (Ajo/Esusu).</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setSheetOpen(true)} className="rounded-full"><Plus className="h-4 w-4" /> Start New Save</Button>
        </div>
      </div>

      <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
        {(["all", "flexible", "targeted", "group"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`rounded-pill px-6 py-2 text-xs font-semibold border transition-all ${
              activeTab === t 
                ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" 
                : "bg-surface border-border hover:bg-surface-alt"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Savings Stats Summary */}
        <section className="lg:col-span-3 grid md:grid-cols-3 gap-4">
          <div className="rounded-3xl bg-primary text-primary-foreground p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><PiggyBank className="h-12 w-12" /></div>
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold opacity-70">Total Savings</div>
            <div className="font-display text-3xl font-bold mt-2 tabular">{formatNaira(DEMO_SAVINGS.reduce((acc, s) => acc + s.balance, 0))}</div>
            <div className="mt-4 flex items-center gap-2 text-xs opacity-70">
              <ArrowUpRight className="h-3 w-3 text-accent" />
              <span>+₦2,450 interest this month</span>
            </div>
          </div>
          <div className="rounded-3xl bg-surface border border-border p-6">
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground">Active Goals</div>
            <div className="font-display text-3xl font-bold mt-2 tabular">{DEMO_SAVINGS.filter(s => s.type === "targeted").length}</div>
            <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
              <Target className="h-3 w-3" />
              <span>On track for 2 goals</span>
            </div>
          </div>
          <div className="rounded-3xl bg-surface border border-border p-6">
            <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground">Group Contributions</div>
            <div className="font-display text-3xl font-bold mt-2 tabular">{formatNaira(DEMO_SAVINGS.filter(s => s.type === "group").reduce((acc, s) => acc + s.balance, 0))}</div>
            <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>Next payout in 12 days</span>
            </div>
          </div>
        </section>

        {/* Individual Savings Cards */}
        <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSavings.map((s) => (
            <div key={s.id} className="rounded-3xl bg-surface border border-border p-6 kw-card-hover group">
              <div className="flex items-start justify-between">
                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center ${
                  s.type === "flexible" ? "bg-success/10 text-success" : 
                  s.type === "targeted" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                }`}>
                  {s.type === "flexible" ? <PiggyBank className="h-5 w-5" /> : 
                   s.type === "targeted" ? <Target className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                </div>
                <div className="text-[10px] uppercase tracking-[0.1em] font-bold px-2 py-1 rounded-pill bg-surface-alt">
                  {s.type}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <div className="font-display text-2xl font-bold mt-1 tabular">{formatNaira(s.balance)}</div>
              </div>

              {s.type === "targeted" && s.target && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{Math.round((s.balance / s.target) * 100)}%</span>
                  </div>
                  <Progress value={(s.balance / s.target) * 100} className="h-1.5" />
                  <div className="text-[10px] text-muted-foreground">Target: {formatNaira(s.target)}</div>
                </div>
              )}

              {s.type === "group" && (
                <div className="mt-4 p-3 rounded-2xl bg-surface-alt flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-6 w-6 rounded-full border-2 border-surface bg-primary/20 flex items-center justify-center text-[8px] font-bold">
                        {i}
                      </div>
                    ))}
                    <div className="h-6 w-6 rounded-full border-2 border-surface bg-surface-alt flex items-center justify-center text-[8px] font-bold">
                      +{s.membersCount! - 3}
                    </div>
                  </div>
                  <div className="text-[10px] font-semibold text-muted-foreground">{s.groupName}</div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <div className="text-[10px] text-muted-foreground">
                  <span className="font-semibold text-foreground">{s.interestRate}</span> interest
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 px-2 group-hover:bg-primary group-hover:text-primary-foreground"
                  onClick={() => openDetail(s)}
                >
                  View <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SavingsDetailSheet open={detailSheetOpen} onOpenChange={setDetailSheetOpen} plan={selectedPlan} />

      {/* Info Sections */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="font-display text-xl font-semibold flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-primary" /> Why save on CorperOne?
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0 font-bold text-primary">1</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Automated Allawee Save:</span> Set it and forget it. We'll automatically move a portion of your allowance to your reserve.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0 font-bold text-primary">2</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">High-Yield Interest:</span> Earn up to 12% p.a. on your savings, far higher than traditional bank accounts.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0 font-bold text-primary">3</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Secure & Transparent:</span> All funds are held in CBN-regulated institutions with full escrow protection.
              </p>
            </div>
          </div>
        </section>
        
        <div className="rounded-3xl bg-accent text-accent-foreground p-8 flex flex-col justify-center">
          <h2 className="font-display text-2xl font-bold mb-4">Join an Ajo Group</h2>
          <p className="text-sm opacity-80 mb-6">
            Group savings (Esusu/Ajo) with your CDS group or platoon. Pooled funds, rotational payouts, 100% verified.
          </p>
          <Button onClick={() => setSheetOpen(true)} className="w-fit bg-primary text-primary-foreground hover:bg-primary-hover px-8">Find a group</Button>
        </div>
      </div>
    </AppShell>
  );
};

export default Savings;
