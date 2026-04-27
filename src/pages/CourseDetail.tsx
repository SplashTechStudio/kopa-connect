import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_COURSES } from "@/lib/demo-data";
import { ArrowLeft, BadgeCheck, Clock, GraduationCap, Loader2, PlayCircle, Sparkles, Star, Trophy, Users } from "lucide-react";
import { toast } from "sonner";

const CourseDetail = () => {
  const { id } = useParams();
  const course = useMemo(() => DEMO_COURSES.find((c) => c.id === id), [id]);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  if (!course) {
    return (
      <AppShell title="Course">
        <div className="rounded-3xl bg-surface border border-border p-12 text-center">
          <div className="font-display text-2xl">Course not found</div>
          <Button asChild variant="soft" className="mt-4"><Link to="/app/academy"><ArrowLeft className="h-4 w-4" /> Back</Link></Button>
        </div>
      </AppShell>
    );
  }

  const enrol = async () => {
    setEnrolling(true);
    await new Promise((r) => setTimeout(r, 900));
    setEnrolling(false);
    setEnrolled(true);
    toast.success(`You're in. First lesson unlocked: "${course.modules[0].title}".`);
  };

  return (
    <AppShell title={course.title}>
      <Button asChild variant="ghost" size="sm" className="mb-3"><Link to="/app/academy"><ArrowLeft className="h-4 w-4" /> Academy</Link></Button>

      <div className="grid lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8 space-y-5">
          <div className="rounded-3xl bg-primary text-primary-foreground p-7 lg:p-9 relative overflow-hidden kw-noise">
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap gap-2">
                {course.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-pill bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]">
                    <Sparkles className="h-3 w-3 text-accent" /> {t}
                  </span>
                ))}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold mt-4 text-balance">{course.title}</h1>
              <div className="text-sm opacity-80 mt-2">By {course.instructor} · {course.level}</div>
              <p className="text-primary-foreground/80 mt-4 text-pretty leading-relaxed max-w-2xl">{course.blurb}</p>

              <div className="mt-6 flex flex-wrap gap-3 text-xs">
                <Badge icon={Clock} text={course.duration} />
                <Badge icon={Users} text={`${course.students.toLocaleString()} corpers enrolled`} />
                <Badge icon={Star} text={`${course.rating} avg rating`} />
                {course.certificate && <Badge icon={Trophy} text="Certificate of completion" />}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-surface border border-border p-6">
            <h2 className="font-display text-xl font-semibold">What you'll learn</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              {course.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2"><BadgeCheck className="h-4 w-4 text-success mt-0.5 shrink-0" /><span>{o}</span></li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-surface border border-border p-6">
            <h2 className="font-display text-xl font-semibold">Curriculum</h2>
            <div className="mt-4 divide-y divide-border">
              {course.modules.map((m, i) => (
                <div key={m.title} className="flex items-center gap-3 py-3">
                  <span className="h-9 w-9 rounded-pill bg-surface-alt flex items-center justify-center font-display font-bold text-sm">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold">{m.title}</div>
                    <div className="text-xs text-muted-foreground">{m.lessons} lessons · {m.duration}</div>
                  </div>
                  <PlayCircle className={`h-5 w-5 ${i === 0 || enrolled ? "text-primary" : "text-muted-foreground/40"}`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl bg-surface border border-border p-6 sticky top-20">
            <div className="text-7xl text-center">{course.emoji}</div>
            <div className="font-display text-3xl font-bold tabular mt-3 text-center">
              {course.price === 0 ? "Free" : `₦${course.price.toLocaleString()}`}
            </div>
            <div className="text-xs text-success font-semibold text-center mt-1">Sponsored by NYSC for verified corpers</div>

            <Button onClick={enrol} disabled={enrolling || enrolled} size="lg" className="w-full mt-5">
              {enrolling ? <><Loader2 className="h-4 w-4 animate-spin" /> Enrolling…</>
                : enrolled ? <><BadgeCheck className="h-4 w-4" /> You're enrolled</>
                : <><GraduationCap className="h-4 w-4" /> Enrol — free</>}
            </Button>

            {enrolled && (
              <Button variant="soft" className="w-full mt-2"><PlayCircle className="h-4 w-4" /> Start first lesson</Button>
            )}

            <div className="mt-5 space-y-3 text-sm">
              <Row label="Format" value="Self-paced video" />
              <Row label="Language" value="English" />
              <Row label="Access" value="Lifetime" />
              <Row label="Certificate" value={course.certificate ? "Yes" : "No"} />
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
};

const Badge = ({ icon: Icon, text }: { icon: typeof Clock; text: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/10 px-3 py-1.5 font-semibold">
    <Icon className="h-3.5 w-3.5" /> {text}
  </span>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default CourseDetail;
