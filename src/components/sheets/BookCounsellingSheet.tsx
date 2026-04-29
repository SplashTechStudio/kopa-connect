import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Heart, ShieldCheck, BadgeCheck, Calendar, Clock, User } from "lucide-react";
import { toast } from "sonner";

const COUNSELLORS = [
  { id: "1", name: "Dr. Funmi Adebayo", role: "Mental Health Expert", rating: "4.9", emoji: "👩‍⚕️" },
  { id: "2", name: "Pastor Ben", role: "Relationship Coach", rating: "4.8", emoji: "👨‍🏫" },
  { id: "3", name: "Coach Tunde", role: "Career Path Strategist", rating: "5.0", emoji: "👔" },
];

export const BookCounsellingSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [step, setStep] = useState<"select" | "form">("select");
  const [selectedCounsellor, setSelectedCounsellor] = useState(COUNSELLORS[0]);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setStep("select"); setDate(""); setReason(""); setDone(false);
  };

  const submit = async () => {
    if (!date || !reason) {
      toast.error("Please provide a date and reason.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setDone(true);
    toast.success("Counselling session booked!");
    setTimeout(() => { reset(); onOpenChange(false); }, 1500);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[92vh] overflow-y-auto">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent text-accent-foreground self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] w-fit">
                <Heart className="h-3 w-3" /> Support & Guidance
              </div>
              <SheetTitle className="font-display text-3xl">Book a Session</SheetTitle>
              <p className="text-sm text-muted-foreground">Talk to verified experts in a safe and confidential space.</p>
            </SheetHeader>

            <div className="mt-6 max-w-2xl mx-auto">
              {step === "select" ? (
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-[0.1em] font-bold text-muted-foreground mb-2">Choose a Counsellor</div>
                  {COUNSELLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCounsellor(c); setStep("form"); }}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-surface-alt border border-border hover:border-primary transition-all text-left"
                    >
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                        {c.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.role} · ⭐ {c.rating}</div>
                      </div>
                      <Button size="sm" variant="ghost">Select</Button>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid gap-5">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-alt border border-border">
                    <span className="text-2xl">{selectedCounsellor.emoji}</span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{selectedCounsellor.name}</div>
                      <div className="text-xs text-muted-foreground">{selectedCounsellor.role}</div>
                    </div>
                    <button onClick={() => setStep("select")} className="text-xs text-primary font-bold">Change</button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Preferred Date">
                      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-11 rounded-xl" />
                    </Field>
                    <Field label="Preferred Time">
                      <select className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm">
                        <option>09:00 AM</option>
                        <option>11:00 AM</option>
                        <option>02:00 PM</option>
                        <option>04:00 PM</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="What would you like to discuss?">
                    <Textarea 
                      value={reason} 
                      onChange={(e) => setReason(e.target.value)} 
                      placeholder="Give us a brief idea of what's on your mind..." 
                      className="min-h-[100px] rounded-xl" 
                    />
                  </Field>

                  <div className="rounded-2xl bg-surface-alt p-4 flex items-start gap-3 text-sm">
                    <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold">100% Confidential.</div>
                      <div className="text-muted-foreground mt-0.5">Your sessions are private and are not shared with NYSC or your PPA.</div>
                    </div>
                  </div>

                  <Button onClick={submit} disabled={loading} size="lg" className="w-full">
                    {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Booking...</> : <>Confirm Booking</>}
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="py-12 text-center animate-snap-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
              <BadgeCheck className="h-8 w-8 text-success-foreground" />
            </div>
            <div className="font-display text-2xl mt-4">Session Booked!</div>
            <div className="text-sm text-muted-foreground mt-1">You will receive a meeting link via email shortly.</div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground mb-1.5 block">{label}</label>
    {children}
  </div>
);
