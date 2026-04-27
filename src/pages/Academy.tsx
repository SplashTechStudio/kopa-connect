import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_COURSES, DEMO_JOBS } from "@/lib/demo-data";
import { Briefcase, GraduationCap, HeartHandshake, Sparkles } from "lucide-react";

const Academy = () => {
  return (
    <AppShell title="Career & Academy">
      <div className="rounded-3xl bg-primary text-primary-foreground p-7 lg:p-10 relative overflow-hidden kw-noise">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]">
            <Sparkles className="h-3 w-3 text-accent" /> Kopa Academy
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mt-4 text-balance">Skill up while serving. Land work after POP.</h1>
          <p className="text-primary-foreground/70 mt-3">Curated courses, verified employers, and structured counselling — for the year that matters most.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        <section className="rounded-3xl bg-surface border border-border p-6">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2"><Briefcase className="h-5 w-5" /> Open positions</h2>
          <div className="mt-4 space-y-3">
            {DEMO_JOBS.map((j) => (
              <div key={j.id} className="rounded-xl bg-surface-alt p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{j.title}</div>
                  <div className="text-xs text-muted-foreground">{j.company} · {j.location} · {j.pay}</div>
                </div>
                <Button size="sm" variant="soft">Apply</Button>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-3xl bg-surface border border-border p-6">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2"><GraduationCap className="h-5 w-5" /> Featured courses</h2>
          <div className="mt-4 space-y-3">
            {DEMO_COURSES.map((c) => (
              <div key={c.id} className="rounded-xl bg-surface-alt p-4">
                <div className="font-semibold">{c.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.instructor} · {c.level} · {c.students.toLocaleString()} corpers</div>
                <Button size="sm" className="mt-3">Enrol — free</Button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-3xl bg-accent text-accent-foreground p-6 lg:p-8 flex flex-col lg:flex-row gap-5 items-start lg:items-center">
        <HeartHandshake className="h-8 w-8" />
        <div className="flex-1">
          <div className="font-display text-xl font-semibold">Counselling sessions</div>
          <div className="text-sm opacity-80 mt-1">Career, relationships, mental health. Verified counsellors. Confidential.</div>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-hover">Book session</Button>
      </section>
    </AppShell>
  );
};

export default Academy;
