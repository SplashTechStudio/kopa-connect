import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, ShieldCheck, Wallet, Building2, Store, MessageCircleMore, GraduationCap, Sparkles, Lock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { formatNaira } from "@/lib/format";
import heroImage from "@/assets/hero-corper.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#modules" className="hover:text-foreground transition-colors">Modules</a>
            <a href="#nysc" className="hover:text-foreground transition-colors">For NYSC</a>
            <a href="#trust" className="hover:text-foreground transition-colors">Trust & Safety</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/verify">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/verify">Verify ID <ArrowRight className="ml-1" /></Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground kw-noise">
        <div className="absolute inset-0 kw-grid opacity-50" />
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl" />
        <div className="container relative grid lg:grid-cols-12 gap-10 lg:gap-6 py-16 lg:py-28">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-pill bg-white/10 backdrop-blur px-3 py-1.5 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Built with Qreva · Proposed digital infrastructure for NYSC
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] text-balance">
              Your service year,<br />
              <span className="text-accent">unlocked.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl text-pretty">
              Kopa We is the official-grade super-app for every Nigerian Corps Member.
              Verified identity, instant Allawee Advance, accommodation, marketplace,
              and a state-by-state community — in one place.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/verify">Verify your NYSC ID <ArrowRight className="ml-1" /></Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-primary-foreground hover:bg-white/10">
                <Link to="/app">Explore the app</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-accent" /> NYSC-API verified IDs</div>
              <div className="flex items-center gap-2"><Lock className="h-4 w-4 text-accent" /> Safetrade escrow on every deal</div>
              <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-accent" /> Corps credit scoring</div>
            </div>
          </div>

          {/* Hero mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm animate-fade-up">
              <div className="absolute -inset-6 bg-accent/20 rounded-[2rem] blur-2xl" />
              <div className="relative rounded-3xl bg-surface text-foreground shadow-lg overflow-hidden border border-white/10">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={heroImage}
                    alt="A verified Nigerian corps member in NYSC khaki uniform"
                    className="h-full w-full object-cover"
                    width={1080}
                    height={1920}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.12em] opacity-80">Corps Member</div>
                      <div className="font-display text-base font-semibold">Adaeze Okonkwo</div>
                      <div className="text-[11px] opacity-80">LA/24A/1234 · Lagos</div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-pill bg-success px-2 py-0.5 text-[10px] font-bold animate-snap-in">
                      <BadgeCheck className="h-3 w-3" /> Verified
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3 bg-primary text-primary-foreground">
                  <div className="text-[10px] uppercase tracking-[0.12em] opacity-70">Wallet balance</div>
                  <div className="font-display text-3xl font-bold tabular">{formatNaira(87_450)}</div>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {["Send", "Loan", "Pay"].map(action => (
                      <button key={action} className="rounded-pill bg-white/10 hover:bg-white/15 transition-colors py-2 text-xs font-semibold">
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  {[
                    { label: "Allawee Advance disbursed", amount: "+₦25,000", color: "text-success" },
                    { label: "Safetrade • Mattress", amount: "−₦8,000", color: "text-foreground" },
                    { label: "MTN airtime", amount: "−₦1,500", color: "text-foreground" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className={`font-semibold tabular ${row.color}`}>{row.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border bg-surface-alt">
        <div className="container grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
          {[
            { v: "₦1k–₦100k", k: "Allawee Advance range" },
            { v: "37 states", k: "State-based feeds" },
            { v: "0%", k: "Hidden fees, ever" },
            { v: "<60s", k: "From verify to wallet" },
          ].map((s) => (
            <div key={s.k} className="px-4 py-6 md:py-8">
              <div className="font-display text-2xl md:text-3xl font-semibold">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.1em] text-muted-foreground">{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="container py-20 lg:py-28">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground font-semibold">The modules</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 text-balance">One app. Every part of your service year.</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Built around the seven jobs corpers actually do — not the eight forms NYSC sends them to fill.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {MODULES.map((m) => (
            <article
              key={m.title}
              className="group relative rounded-2xl border border-border bg-surface p-6 kw-card-hover overflow-hidden"
            >
              <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-4">
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{m.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 text-pretty">{m.body}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {m.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* For NYSC */}
      <section id="nysc" className="bg-surface-alt border-y border-border py-20 lg:py-28">
        <div className="container grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground font-semibold">For NYSC officials</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-balance">
              The first centralized welfare & engagement layer for the Scheme.
            </h2>
            <p className="text-muted-foreground text-lg">
              Reach every corps member instantly, monitor welfare in real time,
              cut fraud & impersonation, and see how the Scheme is performing — by state, by LGA, by CDS group.
            </p>
            <Button asChild variant="default" size="lg">
              <Link to="/verify">See the Admin Console <ArrowRight /></Link>
            </Button>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {NYSC_GAINS.map((g) => (
              <div key={g.title} className="rounded-2xl bg-surface p-6 border border-border">
                <ShieldCheck className="h-5 w-5 text-success mb-3" />
                <div className="font-display text-lg font-semibold">{g.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{g.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="container py-20 lg:py-28">
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 lg:p-16 relative overflow-hidden kw-noise">
          <div className="absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-accent/15 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-balance">
                Trust isn't a feature.<br />It's the foundation.
              </h2>
              <p className="text-primary-foreground/80 mt-5 text-lg max-w-md">
                Every shilling moves through Safetrade escrow. Every account is tied to a verified NYSC identity.
                Every loan is priced against your Corps Credit Score — not your background.
              </p>
            </div>
            <div className="space-y-4">
              {TRUST_POINTS.map((t) => (
                <div key={t.title} className="rounded-xl bg-white/5 backdrop-blur p-5 border border-white/10">
                  <div className="flex items-start gap-3">
                    <t.icon className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold">{t.title}</div>
                      <div className="text-sm text-primary-foreground/70 mt-1">{t.body}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-accent text-accent-foreground">
        <div className="container py-20 lg:py-28 text-center">
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] text-balance">
            Verify your NYSC status.<br /> Claim your wallet.
          </h2>
          <p className="text-accent-foreground/70 mt-6 max-w-xl mx-auto text-lg">
            One scan with your call-up number. Less than a minute. Free, forever.
          </p>
          <Button asChild size="xl" className="mt-10 bg-primary text-primary-foreground hover:bg-primary-hover">
            <Link to="/verify">Get started <ArrowRight /></Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <Logo />
          <div>© {new Date().getFullYear()} Kopa We · A Qreva product</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">NDPC</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const MODULES = [
  { icon: Wallet, title: "Qreva Finance", body: "Allawee Advance, P2P transfers, savings, bills & data.", bullets: ["Loans ₦1k–₦100k", "Group savings for CDS", "Airtime / data on credit"] },
  { icon: Building2, title: "Accommodation", body: "Verified landlords, roommate matching, room transfers.", bullets: ["Rent paid via Safetrade", "Move-in starter packages", "Corper-to-corper handover"] },
  { icon: Store, title: "Marketplace & Declutter", body: "Buy and sell with other corpers, then resell on POP.", bullets: ["“Full Room Setup” bundles", "Local & national vendors", "Last-mile logistics"] },
  { icon: Lock, title: "Safetrade Escrow", body: "Every transaction held until both sides confirm.", bullets: ["Rentals, marketplace, services", "One-tap dispute", "CBN-aligned controls"] },
  { icon: MessageCircleMore, title: "Community & News", body: "State-based feeds, CDS chats, threads, polls and devotionals.", bullets: ["Official NYSC announcements", "Reddit-style threads", "Daily devotionals"] },
  { icon: GraduationCap, title: "Career & Kopa Academy", body: "Internships, jobs, courses and counselling for after service.", bullets: ["Skill marketplace", "Verified employers", "Mental-health support"] },
];

const NYSC_GAINS = [
  { title: "Reach every corper, instantly", body: "Push official broadcasts to one state, one CDS group, or all 200,000+ members." },
  { title: "Real-time welfare monitoring", body: "See complaints, sentiment and engagement as they happen — by state and LGA." },
  { title: "Cut fraud & impersonation", body: "Every account is tied to a verified call-up number, not just an email address." },
  { title: "Data insights you can act on", body: "Posting trends, allowance friction, accommodation pain points — all in one console." },
];

const TRUST_POINTS = [
  { icon: BadgeCheck, title: "Verified Corps Identity", body: "We verify against the NYSC database and issue a tamper-proof Digital Corps ID with QR." },
  { icon: ShieldCheck, title: "Safetrade by default", body: "Funds for rentals, marketplace and services are held in escrow until both sides confirm." },
  { icon: TrendingUp, title: "Corps Credit Score", body: "A proprietary score built from your NYSC status, behaviour and on-platform activity — not your tribe or background." },
  { icon: Lock, title: "NDPC-aligned data privacy", body: "Bank-grade encryption, granular consent, and a clear path to delete your data when you’re done." },
];

export default Landing;
