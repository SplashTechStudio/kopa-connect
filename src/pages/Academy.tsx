import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_COURSES } from "@/lib/demo-data";
import { GraduationCap, HeartHandshake, Sparkles, Star, Users } from "lucide-react";

const Academy = () => {
  return (
    <AppShell title="CorperOne Academy">
      <div className="rounded-3xl bg-primary text-primary-foreground p-7 lg:p-10 relative overflow-hidden kw-noise">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]">
            <Sparkles className="h-3 w-3 text-accent" /> CorperOne Academy
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mt-4 text-balance">Skill up while serving. Land work after POP.</h1>
          <p className="text-primary-foreground/70 mt-3">Curated courses, industry certifications, and career roadmaps — for the year that matters most.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-5 mt-6">
        <section className="lg:col-span-8 rounded-3xl bg-surface border border-border p-6">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2"><GraduationCap className="h-5 w-5" /> Featured courses</h2>
          <div className="mt-4 space-y-3">
            {DEMO_COURSES.map((c) => (
              <Link to={`/app/academy/${c.id}`} key={c.id} className="block rounded-xl bg-surface-alt p-4 hover:bg-surface transition-colors border border-transparent hover:border-border">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{c.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{c.instructor} · {c.level}</div>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-2">
                      <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {c.students.toLocaleString()}</span>
                      <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" /> {c.rating}</span>
                    </div>
                  </div>
                  <Button size="sm">View</Button>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        <aside className="lg:col-span-4 space-y-5">
          <div className="rounded-3xl bg-surface border border-border p-6">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /> Why CorperOne Academy?</h2>
            <div className="mt-4 space-y-4">
              <div>
                <div className="text-sm font-semibold">Zero upfront cost</div>
                <div className="text-xs text-muted-foreground mt-1">All courses are free for verified corp members during their service year.</div>
              </div>
              <div>
                <div className="text-sm font-semibold">Certified by NYSC</div>
                <div className="text-xs text-muted-foreground mt-1">Get an official certificate recognized by partners like Paystack and Flutterwave.</div>
              </div>
              <div>
                <div className="text-sm font-semibold">Job matching</div>
                <div className="text-xs text-muted-foreground mt-1">Top performers get fast-tracked for interviews at partner companies.</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
};

export default Academy;
