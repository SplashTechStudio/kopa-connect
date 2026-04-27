import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BadgeCheck, HeartHandshake, Loader2 } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = ["Allowance", "PPA", "Accommodation", "Health", "Harassment", "Other"];

export const WelfareSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [body, setBody] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => { setTitle(""); setCategory(CATEGORIES[0]); setBody(""); setAnonymous(false); setDone(false); };

  const submit = async () => {
    if (!title || !body) { toast.error("Add a title and a short description."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setDone(true);
    toast.success("Ticket sent to NYSC officials.");
    setTimeout(() => { reset(); onOpenChange(false); }, 1500);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[92vh] overflow-y-auto">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent text-accent-foreground self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] w-fit">
                <HeartHandshake className="h-3 w-3" /> Welfare ticket
              </div>
              <SheetTitle className="font-display text-3xl">Tell NYSC what's going on.</SheetTitle>
              <p className="text-sm text-muted-foreground">Routed directly to your zonal inspector. Average response time: under 48 hours.</p>
            </SheetHeader>

            <div className="mt-6 grid gap-5 max-w-2xl">
              <div>
                <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground mb-1.5 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button key={c} type="button" onClick={() => setCategory(c)}
                      className={`rounded-pill px-3 py-1.5 text-xs font-semibold border transition-colors ${category === c ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border hover:bg-surface-alt"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground mb-1.5 block">Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="One-liner about the issue" className="h-11 rounded-xl" />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground mb-1.5 block">What happened?</label>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Be specific — dates, location, names if relevant. Officials see your full member profile unless you tick 'anonymous'." className="min-h-[140px] rounded-xl" />
              </div>

              <label className="flex items-start gap-3 rounded-2xl bg-surface-alt p-4 cursor-pointer">
                <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="mt-1" />
                <div className="text-sm">
                  <div className="font-semibold">Submit anonymously</div>
                  <div className="text-muted-foreground mt-0.5">Officials see your state and CDS group, but not your name or call-up number.</div>
                </div>
              </label>

              <Button onClick={submit} disabled={loading} size="lg" className="w-full">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send to officials</>}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center animate-snap-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
              <BadgeCheck className="h-8 w-8 text-success-foreground" />
            </div>
            <div className="font-display text-2xl mt-4">Ticket received</div>
            <div className="text-sm text-muted-foreground mt-1">You'll get an update within 48 hours.</div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
