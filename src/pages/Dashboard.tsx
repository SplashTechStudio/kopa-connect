import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BadgeCheck, Bell, Building2, GraduationCap, Lock, MessageCircleMore, PiggyBank, Send, ShieldCheck, Sparkles, Store, Wallet } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useMember } from "@/context/MemberContext";
import { DEMO_ANNOUNCEMENTS, DEMO_LEDGER, DEMO_WALLET } from "@/lib/demo-data";
import { formatNaira } from "@/lib/format";
import { LoanSheet } from "@/components/sheets/LoanSheet";
import { TransferSheet } from "@/components/sheets/TransferSheet";

const Dashboard = () => {
  const { member } = useMember();
  const [loanOpen, setLoanOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);

  if (!member) return null;

  return (
    <AppShell title={`Welcome, ${member.fullName.split(" ")[0]}.`}>
      <LoanSheet open={loanOpen} onOpenChange={setLoanOpen} />
      <TransferSheet open={transferOpen} onOpenChange={setTransferOpen} />

      <div className="grid lg:grid-cols-12 gap-5">
        {/* Wallet hero */}
        <section className="lg:col-span-8 rounded-3xl bg-primary text-primary-foreground p-6 lg:p-8 relative overflow-hidden kw-noise">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-primary-foreground/70">
                  Total wallet balance
                </div>
                <div className="font-display text-4xl md:text-5xl font-bold tabular mt-2">
                  {formatNaira(DEMO_WALLET.balance)}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-primary-foreground/70">
                  <PiggyBank className="h-4 w-4 text-accent" />
                  Savings: <span className="font-semibold text-primary-foreground tabular">{formatNaira(DEMO_WALLET.savingsBalance)}</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-pill bg-success/15 px-2.5 py-1 text-[11px] font-semibold text-success">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified
              </span>
            </div>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <QuickAction onClick={() => setTransferOpen(true)} icon={Send} label="Send" />
              <QuickAction onClick={() => setLoanOpen(true)} icon={Sparkles} label="Allawee" highlight />
              <QuickAction icon={Wallet} label="Pay bill" />
              <QuickAction icon={PiggyBank} label="Save" />
            </div>
          </div>
        </section>

        {/* Credit score */}
        <section className="lg:col-span-4 rounded-3xl bg-surface border border-border p-6 lg:p-7">
          <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">
            Corps credit score
          </div>
          <div className="font-display text-5xl font-semibold mt-2 tabular">{member.creditScore}</div>
          <div className="text-xs text-success font-semibold mt-1">Excellent · Tier 3 access</div>

          <div className="mt-5 h-2 rounded-pill bg-surface-alt overflow-hidden">
            <div className="h-full bg-gradient-volt rounded-pill" style={{ width: `${(member.creditScore / 850) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            <span>0</span><span>850</span>
          </div>

          <div className="mt-5 space-y-1.5 text-sm">
            <Row label="NYSC status" value="Active" />
            <Row label="On-time repayments" value="6 / 6" />
            <Row label="Marketplace activity" value="High" />
          </div>
        </section>

        {/* Bento modules */}
        <BentoCard
          to="/app/marketplace"
          icon={Store}
          title="Marketplace & Declutter"
          tagline="Sell your stuff before POP. Buy used at corper prices."
          color="bg-surface"
          accent
        />
        <BentoCard
          to="/app/accommodation"
          icon={Building2}
          title="Accommodation"
          tagline="Verified landlords. Room transfers. Roommate finder."
          color="bg-surface"
        />
        <BentoCard
          to="/app/community"
          icon={MessageCircleMore}
          title="Community"
          tagline={`${member.state} state feed · 12 new posts`}
          color="bg-surface"
        />

        {/* Announcements */}
        <section className="lg:col-span-8 rounded-3xl bg-surface border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">From NYSC</div>
              <h2 className="font-display text-xl font-semibold mt-1">Latest announcements</h2>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/community">View all <ArrowRight /></Link>
            </Button>
          </div>
          <div className="mt-5 space-y-3">
            {DEMO_ANNOUNCEMENTS.map((a) => (
              <div key={a.id} className="rounded-xl bg-surface-alt border-l-2 border-primary p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <div className="font-semibold text-sm">{a.title}</div>
                  <span className="ml-auto text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{a.target} · {a.time}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1.5">{a.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent activity */}
        <section className="lg:col-span-4 rounded-3xl bg-surface border border-border p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Recent activity</h2>
            <Button asChild variant="ghost" size="sm"><Link to="/app/finance">All <ArrowRight /></Link></Button>
          </div>
          <div className="mt-4 space-y-3">
            {DEMO_LEDGER.slice(0, 5).map((row) => (
              <div key={row.transactionId} className="flex items-start gap-3 text-sm">
                <span className={`mt-1 h-8 w-8 shrink-0 rounded-pill flex items-center justify-center ${row.amount > 0 ? "bg-success/10 text-success" : "bg-surface-alt text-muted-foreground"}`}>
                  {row.amount > 0 ? <ArrowUpRight className="h-4 w-4 rotate-180" /> : <ArrowUpRight className="h-4 w-4" />}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="truncate">{row.description}</div>
                  <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{row.accountType}</div>
                </div>
                <div className={`font-semibold tabular ${row.amount > 0 ? "text-success" : "text-foreground"}`}>
                  {row.amount > 0 ? "+" : ""}{formatNaira(row.amount).replace("-", "−")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career */}
        <BentoCard
          to="/app/academy"
          icon={GraduationCap}
          title="Kopa Academy"
          tagline="Skill up while serving. Land work after POP."
          color="bg-surface"
        />
        <BentoCard
          to="/app/finance"
          icon={Lock}
          title="Safetrade"
          tagline="Every deal protected. Funds held until both sides confirm."
          color="bg-surface"
        />
        <BentoCard
          to="/app/profile"
          icon={Bell}
          title="Welfare ticket"
          tagline="Report an issue directly to NYSC officials."
          color="bg-surface"
        />
      </div>
    </AppShell>
  );
};

const QuickAction = ({ icon: Icon, label, onClick, highlight }: { icon: typeof Send; label: string; onClick?: () => void; highlight?: boolean }) => (
  <button
    onClick={onClick}
    className={`group rounded-2xl p-3 text-left kw-press transition-colors ${highlight ? "bg-accent text-accent-foreground" : "bg-white/10 text-primary-foreground hover:bg-white/15"}`}
  >
    <Icon className="h-4 w-4" />
    <div className="text-sm font-semibold mt-3">{label}</div>
  </button>
);

const BentoCard = ({ to, icon: Icon, title, tagline, color, accent }: { to: string; icon: typeof Store; title: string; tagline: string; color: string; accent?: boolean }) => (
  <Link
    to={to}
    className={`lg:col-span-4 rounded-3xl border border-border p-6 kw-card-hover ${color} group block relative overflow-hidden`}
  >
    {accent && <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-accent/40 blur-2xl" />}
    <div className="relative flex items-start justify-between">
      <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
    </div>
    <div className="relative mt-5">
      <div className="font-display text-xl font-semibold">{title}</div>
      <div className="text-sm text-muted-foreground mt-1.5 text-pretty">{tagline}</div>
    </div>
  </Link>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default Dashboard;
