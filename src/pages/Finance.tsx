import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_LEDGER, DEMO_LOANS, DEMO_WALLET } from "@/lib/demo-data";
import { formatNaira } from "@/lib/format";
import { ArrowUpRight, Lock, PiggyBank, Send, Sparkles, Wallet, Smartphone, ShieldCheck, HelpCircle, FileText, ChevronRight } from "lucide-react";
import { LoanSheet } from "@/components/sheets/LoanSheet";
import { TransferSheet } from "@/components/sheets/TransferSheet";
import { PayBillsSheet } from "@/components/sheets/PayBillsSheet";
import { AirtimeSheet } from "@/components/sheets/AirtimeSheet";
import { DataSheet } from "@/components/sheets/DataSheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Finance = () => {
  const [loan, setLoan] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [bill, setBill] = useState(false);
  const [airtime, setAirtime] = useState(false);
  const [data, setData] = useState(false);

  return (
    <AppShell title="Finance">
      <LoanSheet open={loan} onOpenChange={setLoan} />
      <TransferSheet open={transfer} onOpenChange={setTransfer} />
      <PayBillsSheet open={bill} onOpenChange={setBill} />
      <AirtimeSheet open={airtime} onOpenChange={setAirtime} />
      <DataSheet open={data} onOpenChange={setData} />

      <div className="grid lg:grid-cols-12 gap-5">
        <section className="lg:col-span-7 rounded-3xl bg-primary text-primary-foreground p-7 relative overflow-hidden kw-noise">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-success text-success-foreground flex items-center justify-center"><ShieldCheck className="h-3 w-3" /></div>
                <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-success">Verification</div>
              </div>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-success text-success-foreground flex items-center justify-center"><ShieldCheck className="h-3 w-3" /></div>
                <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-success">KYC</div>
              </div>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <div className="flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-success text-success-foreground flex items-center justify-center"><Wallet className="h-3 w-3" /></div>
                <div className="text-[10px] uppercase tracking-[0.1em] font-bold text-success">Wallet Active</div>
              </div>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-[10px] uppercase tracking-[0.12em] opacity-70 cursor-help">Wallet balance</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your current spendable balance.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="font-display text-5xl font-bold tabular mt-2">{formatNaira(DEMO_WALLET.balance)}</div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-7">
              <Quick onClick={() => setTransfer(true)} icon={Send} label="Transfer" />
              <Quick onClick={() => setLoan(true)} icon={Sparkles} label="Allawee Advance" highlight />
              <Quick onClick={() => setBill(true)} icon={Wallet} label="Pay bill" />
              <Quick onClick={() => setAirtime(true)} icon={Smartphone} label="Airtime" />
              <Quick onClick={() => setData(true)} icon={Smartphone} label="Data" />
            </div>
          </div>
        </section>

        <section className="lg:col-span-5 rounded-3xl bg-surface border border-border p-7">
          <div className="flex items-center justify-between">
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground cursor-help">Savings</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Funds locked for your post-service future.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="font-display text-3xl font-semibold tabular mt-2">{formatNaira(DEMO_WALLET.savingsBalance)}</div>
            </div>
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mt-3">Locked until POP. Earns 8% p.a. with your CDS group.</p>
          <Button variant="soft" className="mt-4 w-full">Add to savings</Button>
        </section>

        <section className="lg:col-span-7 rounded-3xl bg-surface border border-border p-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h2 className="font-display text-xl font-semibold cursor-help">Transaction history</h2>
              </TooltipTrigger>
              <TooltipContent>
                <p>Complete audit log of all your financial movements.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="mt-4 divide-y divide-border">
            {DEMO_LEDGER.map((row) => (
              <div key={row.transactionId} className="flex items-center gap-3 py-3">
                <span className={`h-9 w-9 rounded-pill flex items-center justify-center ${row.amount > 0 ? "bg-success/10 text-success" : "bg-surface-alt text-muted-foreground"}`}>
                  <ArrowUpRight className={`h-4 w-4 ${row.amount > 0 ? "rotate-180" : ""}`} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{row.description}</div>
                  <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{row.accountType}</div>
                </div>
                <div className={`font-semibold tabular text-sm ${row.amount > 0 ? "text-success" : "text-foreground"}`}>
                  {row.amount > 0 ? "+" : ""}{formatNaira(row.amount).replace("-", "−")}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-5 rounded-3xl bg-surface border border-border p-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h2 className="font-display text-xl font-semibold cursor-help">My Allawee Advance History</h2>
              </TooltipTrigger>
              <TooltipContent>
                <p>Track your previous and active salary advance loans.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="mt-4 space-y-3">
            {DEMO_LOANS.map((l) => (
              <div key={l._id} className="rounded-xl bg-surface-alt p-4">
                <div className="flex items-center justify-between">
                  <div className="font-display text-lg font-semibold tabular">{formatNaira(l.amount)}</div>
                  <span className={`text-[10px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-pill ${l.status === "repaid" ? "bg-success/10 text-success" : "bg-warning/15 text-warning-foreground"}`}>
                    {l.status}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{l.purpose} · due {l.repaymentDate}</div>
              </div>
            ))}
          </div>
          <Button onClick={() => setLoan(true)} variant="default" className="mt-4 w-full">Claim: Get funded (5% interest)</Button>
        </section>

        <section className="lg:col-span-12 rounded-3xl bg-surface border border-border p-6">
          <h2 className="font-display text-xl font-semibold">More options</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <button className="flex items-center gap-3 p-4 rounded-2xl bg-surface-alt hover:bg-surface-alt/80 transition-colors text-left">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold text-sm">Wallet details</div>
                <div className="text-xs text-muted-foreground mt-0.5">View your account numbers</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-2xl bg-surface-alt hover:bg-surface-alt/80 transition-colors text-left">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold text-sm">Dispute transaction</div>
                <div className="text-xs text-muted-foreground mt-0.5">Report a failed transfer</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-2xl bg-surface-alt hover:bg-surface-alt/80 transition-colors text-left">
              <HelpCircle className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold text-sm">Contact and support</div>
                <div className="text-xs text-muted-foreground mt-0.5">Get help with your wallet</div>
              </div>
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
};

const Quick = ({ icon: Icon, label, onClick, highlight }: { icon: typeof Send; label: string; onClick?: () => void; highlight?: boolean }) => (
  <button onClick={onClick} className={`rounded-2xl p-3 text-left kw-press ${highlight ? "bg-accent text-accent-foreground" : "bg-white/10 hover:bg-white/15"}`}>
    <Icon className="h-4 w-4" />
    <div className="text-sm font-semibold mt-3">{label}</div>
  </button>
);

export default Finance;
