import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_LEDGER, DEMO_LOANS, DEMO_WALLET } from "@/lib/demo-data";
import { formatNaira } from "@/lib/format";
import { ArrowUpRight, Lock, PiggyBank, Send, Sparkles, Wallet } from "lucide-react";
import { LoanSheet } from "@/components/sheets/LoanSheet";
import { TransferSheet } from "@/components/sheets/TransferSheet";

const Finance = () => {
  const [loan, setLoan] = useState(false);
  const [transfer, setTransfer] = useState(false);

  return (
    <AppShell title="Finance">
      <LoanSheet open={loan} onOpenChange={setLoan} />
      <TransferSheet open={transfer} onOpenChange={setTransfer} />

      <div className="grid lg:grid-cols-12 gap-5">
        <section className="lg:col-span-7 rounded-3xl bg-primary text-primary-foreground p-7 relative overflow-hidden kw-noise">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.12em] opacity-70">Wallet</div>
            <div className="font-display text-5xl font-bold tabular mt-2">{formatNaira(DEMO_WALLET.balance)}</div>
            <div className="grid grid-cols-4 gap-2.5 mt-7">
              <Quick onClick={() => setTransfer(true)} icon={Send} label="Send" />
              <Quick onClick={() => setLoan(true)} icon={Sparkles} label="Loan" highlight />
              <Quick icon={Wallet} label="Bills" />
              <Quick icon={PiggyBank} label="Save" />
            </div>
          </div>
        </section>

        <section className="lg:col-span-5 rounded-3xl bg-surface border border-border p-7">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">Savings</div>
              <div className="font-display text-3xl font-semibold tabular mt-2">{formatNaira(DEMO_WALLET.savingsBalance)}</div>
            </div>
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mt-3">Locked until POP. Earns 8% p.a. with your CDS group.</p>
          <Button variant="soft" className="mt-4 w-full">Add to savings</Button>
        </section>

        <section className="lg:col-span-7 rounded-3xl bg-surface border border-border p-6">
          <h2 className="font-display text-xl font-semibold">Audit ledger</h2>
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
          <h2 className="font-display text-xl font-semibold">My loans</h2>
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
          <Button onClick={() => setLoan(true)} variant="default" className="mt-4 w-full">Request new advance</Button>
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
