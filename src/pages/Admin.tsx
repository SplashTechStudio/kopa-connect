import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_ANNOUNCEMENTS } from "@/lib/demo-data";
import { Activity, BadgeCheck, Megaphone, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";

const STATS = [
  { label: "Active corpers", value: "187,420", icon: Users, delta: "+4.2%" },
  { label: "Verified IDs (24h)", value: "3,108", icon: BadgeCheck, delta: "+12%" },
  { label: "Welfare tickets", value: "224", icon: Activity, delta: "−8%" },
  { label: "Engagement", value: "62%", icon: TrendingUp, delta: "+1.4%" },
];

const Admin = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [target, setTarget] = useState("Nationwide");

  const send = () => {
    if (!title.trim() || !body.trim()) return toast.error("Title and body required.");
    toast.success(`Broadcast sent to ${target}.`);
    setTitle(""); setBody("");
  };

  return (
    <AppShell title="NYSC Admin Console">
      <div className="rounded-3xl bg-primary text-primary-foreground p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center gap-4 kw-noise relative overflow-hidden">
        <ShieldCheck className="h-8 w-8 text-accent" />
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-[0.12em] opacity-70 font-semibold">Restricted access</div>
          <div className="font-display text-2xl font-semibold mt-1">Welfare, engagement & broadcasts — across the Scheme.</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl bg-surface border border-border p-5">
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-semibold text-success">{s.delta}</span>
            </div>
            <div className="font-display text-3xl font-semibold mt-3 tabular">{s.value}</div>
            <div className="text-xs uppercase tracking-[0.1em] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-5 mt-6">
        <section className="lg:col-span-7 rounded-3xl bg-surface border border-border p-6">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2"><Megaphone className="h-5 w-5" /> Broadcast announcement</h2>
          <div className="space-y-3 mt-4">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="h-11 rounded-xl" />
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Message body" className="min-h-[120px] rounded-xl" />
            <div className="flex flex-wrap gap-2">
              {["Nationwide", "Lagos", "Imo", "Abuja", "Oyo", "Rivers"].map((t) => (
                <button key={t} onClick={() => setTarget(t)} className={`rounded-pill px-4 py-1.5 text-xs font-semibold border transition-colors ${target === t ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border hover:bg-surface-alt"}`}>
                  {t}
                </button>
              ))}
            </div>
            <Button onClick={send} size="lg" className="w-full sm:w-auto">Send broadcast to {target}</Button>
          </div>
        </section>

        <section className="lg:col-span-5 rounded-3xl bg-surface border border-border p-6">
          <h2 className="font-display text-xl font-semibold">Recent announcements</h2>
          <div className="mt-4 space-y-3">
            {DEMO_ANNOUNCEMENTS.map((a) => (
              <div key={a.id} className="rounded-xl bg-surface-alt p-4 border-l-2 border-primary">
                <div className="font-semibold text-sm">{a.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{a.target} · {a.time}</div>
                <div className="text-sm mt-2 text-muted-foreground">{a.body}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
};

export default Admin;
