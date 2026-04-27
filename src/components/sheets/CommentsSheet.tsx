import { useMemo, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigUp, BadgeCheck, MessageCircle, ShieldCheck } from "lucide-react";
import { useMember } from "@/context/MemberContext";
import { DEMO_COMMENTS, type DemoComment } from "@/lib/demo-data";
import { toast } from "@/hooks/use-toast";

interface CommentsSheetProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  postId: string | null;
  postTitle?: string;
  onCountChange?: (postId: string, count: number) => void;
}

interface ThreadNode extends DemoComment {
  children: ThreadNode[];
}

function buildThread(list: DemoComment[]): ThreadNode[] {
  const map = new Map<string, ThreadNode>();
  list.forEach((c) => map.set(c.id, { ...c, children: [] }));
  const roots: ThreadNode[] = [];
  map.forEach((node) => {
    if (node.parentId && map.has(node.parentId)) {
      map.get(node.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
}

export const CommentsSheet = ({ open, onOpenChange, postId, postTitle, onCountChange }: CommentsSheetProps) => {
  const { member } = useMember();
  const [comments, setComments] = useState<DemoComment[]>(DEMO_COMMENTS);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; author: string } | null>(null);
  const [upvoted, setUpvoted] = useState<Record<string, boolean>>({});

  const postComments = useMemo(
    () => comments.filter((c) => c.postId === postId),
    [comments, postId],
  );
  const tree = useMemo(() => buildThread(postComments), [postComments]);

  const submit = () => {
    if (!draft.trim() || !postId || !member) return;
    const next: DemoComment = {
      id: `c_${Date.now()}`,
      postId,
      parentId: replyTo?.id ?? null,
      author: member.fullName,
      handle: `@${member.fullName.split(" ")[0].toLowerCase()}`,
      verified: member.isVerified,
      time: "just now",
      body: draft.trim(),
      upvotes: 0,
    };
    const updated = [...comments, next];
    setComments(updated);
    setDraft("");
    setReplyTo(null);
    onCountChange?.(postId, updated.filter((c) => c.postId === postId).length);
    toast({ title: replyTo ? "Reply posted" : "Comment posted", description: "Your voice is in the thread." });
  };

  const toggleUpvote = (id: string) => {
    setUpvoted((u) => ({ ...u, [id]: !u[id] }));
    setComments((cs) =>
      cs.map((c) => (c.id === id ? { ...c, upvotes: c.upvotes + (upvoted[id] ? -1 : 1) } : c)),
    );
  };

  const renderNode = (n: ThreadNode, depth = 0): JSX.Element => (
    <div key={n.id} className={depth > 0 ? "pl-4 border-l-2 border-border ml-3" : ""}>
      <div className="flex gap-3 py-3">
        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-display font-bold text-xs flex items-center justify-center shrink-0">
          {n.author[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            <span className="font-semibold text-sm text-foreground">{n.author}</span>
            {n.verified && <BadgeCheck className="h-3 w-3 text-success" />}
            {n.official && (
              <span className="inline-flex items-center gap-1 rounded-pill bg-primary text-primary-foreground px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em]">
                <ShieldCheck className="h-2 w-2" /> NYSC
              </span>
            )}
            <span className="text-muted-foreground">· {n.handle} · {n.time}</span>
          </div>
          <p className="text-sm mt-1 text-pretty leading-relaxed">{n.body}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <button
              onClick={() => toggleUpvote(n.id)}
              className={`inline-flex items-center gap-1 hover:text-foreground transition-colors ${upvoted[n.id] ? "text-primary font-semibold" : ""}`}
            >
              <ArrowBigUp className={`h-4 w-4 ${upvoted[n.id] ? "fill-primary" : ""}`} />
              <span className="tabular-nums">{n.upvotes}</span>
            </button>
            <button
              onClick={() => setReplyTo({ id: n.id, author: n.author })}
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Reply
            </button>
          </div>
        </div>
      </div>
      {n.children.length > 0 && (
        <div className="space-y-0">{n.children.map((c) => renderNode(c, depth + 1))}</div>
      )}
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
          <SheetTitle className="font-display text-xl">Thread</SheetTitle>
          {postTitle && (
            <p className="text-xs text-muted-foreground line-clamp-2 text-left">{postTitle}</p>
          )}
          <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            {postComments.length} {postComments.length === 1 ? "comment" : "comments"}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-2">
          {tree.length === 0 ? (
            <div className="text-center py-12 text-sm text-muted-foreground">
              No comments yet — be first to weigh in.
            </div>
          ) : (
            <div className="divide-y divide-border">{tree.map((n) => renderNode(n))}</div>
          )}
        </div>

        <div className="border-t border-border px-5 py-4 bg-surface-alt">
          {replyTo && (
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="text-muted-foreground">
                Replying to <span className="font-semibold text-foreground">{replyTo.author}</span>
              </span>
              <button onClick={() => setReplyTo(null)} className="text-muted-foreground hover:text-foreground">
                Cancel
              </button>
            </div>
          )}
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={replyTo ? `Reply to ${replyTo.author}…` : "Add to the conversation…"}
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-end mt-2">
            <Button size="sm" disabled={!draft.trim()} onClick={submit}>
              {replyTo ? "Post reply" : "Post comment"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
