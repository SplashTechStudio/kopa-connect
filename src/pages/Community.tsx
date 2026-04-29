import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEMO_FEED, DEMO_COMMENTS } from "@/lib/demo-data";
import { ArrowBigUp, BadgeCheck, MessageCircle, Pin, ShieldCheck } from "lucide-react";
import { CommentsSheet } from "@/components/sheets/CommentsSheet";
import { useMember } from "@/context/MemberContext";
import { toast } from "@/hooks/use-toast";

const TABS = ["For you", "News", "Sports", "Religious", "Programs", "Discussion"];

interface FeedPost {
  id: string;
  author: string;
  handle: string;
  verified: boolean;
  official: boolean;
  state: string;
  category: string;
  time: string;
  body: string;
  upvotes: number;
  comments: number;
}

const Community = () => {
  const { member } = useMember();
  const [tab, setTab] = useState("For you");
  const [draft, setDraft] = useState("");
  const [posts, setPosts] = useState<FeedPost[]>(() =>
    DEMO_FEED.map((p) => ({
      ...p,
      comments: DEMO_COMMENTS.filter((c) => c.postId === p.id).length,
    })),
  );
  const [upvoted, setUpvoted] = useState<Record<string, boolean>>({});
  const [pollVote, setPollVote] = useState<number | null>(null);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const items = useMemo(
    () => posts.filter((p) => tab === "For you" || p.category === tab),
    [posts, tab],
  );
  const activePost = posts.find((p) => p.id === activePostId);

  const toggleUpvote = (id: string) => {
    const wasUp = !!upvoted[id];
    setUpvoted((u) => ({ ...u, [id]: !wasUp }));
    setPosts((ps) =>
      ps.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + (wasUp ? -1 : 1) } : p)),
    );
  };

  const submitPost = () => {
    if (!draft.trim() || !member) return;
    const next: FeedPost = {
      id: `f_${Date.now()}`,
      author: member.fullName,
      handle: `@${member.fullName.split(" ")[0].toLowerCase()}`,
      verified: member.isVerified,
      official: false,
      state: member.state,
      category: "Discussion",
      time: "just now",
      body: draft.trim(),
      upvotes: 0,
      comments: 0,
    };
    setPosts((ps) => [next, ...ps]);
    setDraft("");
    toast({ title: "Posted", description: "Your post is live in the feed." });
  };

  const handleCommentCount = (postId: string, count: number) => {
    setPosts((ps) => ps.map((p) => (p.id === postId ? { ...p, comments: count } : p)));
  };

  return (
    <AppShell title="Community">
      <div className="grid lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8">
          <div className="rounded-2xl bg-surface border border-border p-4">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground font-display font-bold flex items-center justify-center shrink-0">
                {member?.fullName[0] ?? "A"}
              </div>
              <div className="flex-1">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitPost()}
                  placeholder="Share with your state…"
                  className="h-11 rounded-pill"
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" disabled={!draft.trim()} onClick={submitPost}>
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-pill px-4 py-1.5 text-xs font-semibold border transition-colors ${tab === t ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border hover:bg-surface-alt"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            {items.map((p) => (
              <article
                key={p.id}
                className={`rounded-2xl border border-border p-5 kw-card-hover ${p.official ? "bg-surface-alt border-l-4 border-l-primary" : "bg-surface"}`}
              >
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
                      <span className="text-xs text-muted-foreground">
                        · {p.handle} · {p.time}
                      </span>
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground mt-0.5">
                      {p.state} · {p.category}
                    </div>
                    <p className="text-sm mt-3 text-pretty leading-relaxed">{p.body}</p>
                    <div className="flex items-center gap-5 mt-4 text-sm text-muted-foreground">
                      <button
                        onClick={() => toggleUpvote(p.id)}
                        className={`inline-flex items-center gap-1.5 transition-all hover:text-foreground ${upvoted[p.id] ? "text-primary font-semibold" : ""}`}
                      >
                        <ArrowBigUp
                          className={`h-4 w-4 transition-transform ${upvoted[p.id] ? "fill-primary scale-110" : ""}`}
                        />
                        <span className="tabular-nums">{p.upvotes}</span>
                      </button>
                      <button
                        onClick={() => setActivePostId(p.id)}
                        className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="tabular-nums">{p.comments}</span>
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
            <h3 className="font-display text-sm font-bold flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-primary" /> Community Rules
            </h3>
            <ul className="text-xs space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span>•</span> Promote progressive & youth-focused conversations.</li>
              <li className="flex gap-2"><span>•</span> No hate speech or controversial political debates.</li>
              <li className="flex gap-2"><span>•</span> Verify information before sharing as 'Official'.</li>
              <li className="flex gap-2"><span>•</span> Respect the privacy of fellow corp members.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-surface border border-border p-5">
            <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">
              Trending in {member?.state ?? "Lagos"}
            </div>
            <div className="mt-3 space-y-3 text-sm">
              {["#AprilAllawee", "#PPAStruggles", "#OwerriCorpers", "#KopaAcademy", "#POPVibes"].map((t) => (
                <div key={t} className="flex items-center justify-between">
                  <span className="font-semibold">{t}</span>
                  <span className="text-xs text-muted-foreground">
                    {Math.floor(Math.random() * 900) + 100} posts
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-primary text-primary-foreground p-5">
            <Pin className="h-4 w-4 text-accent" />
            <div className="font-display text-lg mt-2">Live poll</div>
            <div className="text-sm text-primary-foreground/70 mt-1">
              Which skill-up category is most vital for life after POP?
            </div>
            <div className="mt-4 space-y-2">
              {["Tech & Software", "Business & Finance", "Creative Arts & Media", "Vocational Skills"].map((o, i) => {
                const base = [45, 25, 18, 12][i];
                const adjusted = pollVote === i ? base + 1 : base;
                const isMine = pollVote === i;
                return (
                  <button
                    key={o}
                    onClick={() => setPollVote(i)}
                    className={`w-full rounded-xl px-3 py-2 text-sm text-left transition-colors flex items-center justify-between ${isMine ? "bg-accent text-accent-foreground" : "bg-white/10 hover:bg-white/15"}`}
                  >
                    <span>{o}</span>
                    <span className="tabular-nums text-xs opacity-80">{adjusted}%</span>
                  </button>
                );
              })}
            </div>
            {pollVote !== null && (
              <p className="text-[11px] text-primary-foreground/70 mt-3">
                Vote recorded — results update live.
              </p>
            )}
          </div>
        </aside>
      </div>

      <CommentsSheet
        open={!!activePostId}
        onOpenChange={(v) => !v && setActivePostId(null)}
        postId={activePostId}
        postTitle={activePost?.body}
        onCountChange={handleCommentCount}
      />
    </AppShell>
  );
};

export default Community;
