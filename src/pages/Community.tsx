import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEMO_FEED } from "@/lib/demo-data";
import { ArrowBigUp, BadgeCheck, MessageCircle, Pin, ShieldCheck } from "lucide-react";

const TABS = ["For you", "News", "Sports", "Religious", "Programs", "Discussion"];

const Community = () => {
  const [tab, setTab] = useState("For you");
  const [draft, setDraft] = useState("");
  const items = DEMO_FEED.filter((p) => tab === "For you" || p.category === tab);

  return (
    <AppShell title="Community">
      <div className="grid lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8">
          <div className="rounded-2xl bg-surface border border-border p-4">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground font-display font-bold flex items-center justify-center shrink-0">A</div>
              <div className="flex-1">
                <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Share with your state…" className="h-11 rounded-pill" />
                <div className="flex justify-end mt-2">
                  <Button size="sm" disabled={!draft.trim()}>Post</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-pill px-4 py-1.5 text-xs font-semibold border transition-colors ${tab === t ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border hover:bg-surface-alt"}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            {items.map((p) => (
              <article key={p.id} className={`rounded-2xl border border-border p-5 kw-card-hover ${p.official ? "bg-surface-alt border-l-4 border-l-primary" : "bg-surface"}`}>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground font-display font-bold flex items-center justify-center shrink-0">
                    {p.author[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-sm">{p.author}</span>
                      {p.verified && <BadgeCheck className="h-3.5 w-3.5 text-success" />}
                      {p.official && (
                        <span className="inline-flex items-center gap-1 rounded-pill bg-primary text-primary-foreground px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em]">
                          <ShieldCheck className="h-2.5 w-2.5" /> Official
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">· {p.handle} · {p.time}</span>
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground mt-0.5">{p.state} · {p.category}</div>
                    <p className="text-sm mt-3 text-pretty leading-relaxed">{p.body}</p>
                    <div className="flex items-center gap-5 mt-4 text-sm text-muted-foreground">
                      <button className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                        <ArrowBigUp className="h-4 w-4" /> {p.upvotes}
                      </button>
                      <button className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                        <MessageCircle className="h-4 w-4" /> {p.comments}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl bg-surface border border-border p-5">
            <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">Trending in Lagos</div>
            <div className="mt-3 space-y-3 text-sm">
              {["#AprilAllawee", "#PPAStruggles", "#OwerriCorpers", "#KopaAcademy", "#POPVibes"].map((t) => (
                <div key={t} className="flex items-center justify-between">
                  <span className="font-semibold">{t}</span>
                  <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 900) + 100} posts</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-primary text-primary-foreground p-5">
            <Pin className="h-4 w-4 text-accent" />
            <div className="font-display text-lg mt-2">Live poll</div>
            <div className="text-sm text-primary-foreground/70 mt-1">Should NYSC adjust the allowance schedule?</div>
            <div className="mt-4 space-y-2">
              {["Yes — pay weekly", "Keep monthly", "Add a stipend top-up"].map((o, i) => (
                <button key={o} className="w-full rounded-xl bg-white/10 hover:bg-white/15 px-3 py-2 text-sm text-left transition-colors flex items-center justify-between">
                  <span>{o}</span><span className="tabular text-xs opacity-70">{[58, 27, 15][i]}%</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
};

export default Community;
