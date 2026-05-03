import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BadgeCheck, Building2, UserPlus, Search, Loader2, ShieldCheck, DollarSign, MapPin } from "lucide-react";
import { NIGERIAN_STATES } from "@/lib/demo-data";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type AccommodationIntent = 
  | "looking_for_place" 
  | "have_place_need_tenant" 
  | "need_roommate" 
  | "have_room_need_roommate";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  intent: AccommodationIntent;
}

export const AccommodationIntentSheet = ({ open, onOpenChange, intent }: Props) => {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [state, setState] = useState("Lagos");
  const [lga, setLga] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setTitle(""); setBudget(""); setState("Lagos"); setLga("");
    setDescription(""); setDone(false);
  };

  const submit = async () => {
    if (!title || !budget || !lga || !description) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
    toast.success("Post created! You'll be notified of matches.");
    setTimeout(() => { reset(); onOpenChange(false); }, 1500);
  };

  const getTitle = () => {
    switch (intent) {
      case "looking_for_place": return "Looking for Accommodation";
      case "need_roommate": return "In need of a shared accommodation";
      case "have_room_need_roommate": return "Have room, looking for roommate";
      default: return "Accommodation Request";
    }
  };

  const getSubtitle = () => {
    switch (intent) {
      case "looking_for_place": return "Post your request so landlords and agents can find you.";
      case "need_roommate": return "Find other corpers looking to split rent in your area.";
      case "have_room_need_roommate": return "Have an existing place? Find a verified corper to share with.";
      default: return "Tell us what you're looking for.";
    }
  };

  const getIcon = () => {
    if (intent === "looking_for_place") return Search;
    if (intent.includes("roommate")) return UserPlus;
    return Building2;
  };

  const Icon = getIcon();

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[92vh] overflow-y-auto">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent text-accent-foreground self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] w-fit">
                <Icon className="h-3 w-3" /> {getTitle()}
              </div>
              <SheetTitle className="font-display text-3xl">{intent === "looking_for_place" ? "Find your next home." : "Find the perfect roommate."}</SheetTitle>
              <p className="text-sm text-muted-foreground">{getSubtitle()}</p>
            </SheetHeader>

            <div className="mt-6 grid gap-5 max-w-2xl">
              <Field label="Short Headline">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. ICT corper looking for self-con in Ikeja" className="h-11 rounded-xl" />
              </Field>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Max Rent (₦ / yr)">
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="number" value={budget} onChange={(e) => setBudget(e.target.value === "" ? "" : Number(e.target.value))} placeholder="250000" className="h-11 pl-9 rounded-xl tabular" />
                  </div>
                </Field>
                <Field label="State">
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="h-11 rounded-xl text-sm">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {NIGERIAN_STATES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field label="LGA / Area Preference">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={lga} onChange={(e) => setLga(e.target.value)} placeholder="e.g. Ikeja, Allen Avenue, Opebi" className="h-11 pl-9 rounded-xl" />
                </div>
              </Field>

              <Field label="Additional Details">
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell us about your lifestyle, PPA location, or specific requirements..." className="min-h-[120px] rounded-xl" />
              </Field>

              <div className="rounded-2xl bg-surface-alt p-4 flex items-start gap-3 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">Verified matches only.</div>
                  <div className="text-muted-foreground mt-0.5">We'll only connect you with verified corpers or landlords to keep you safe.</div>
                </div>
              </div>

              <Button onClick={submit} disabled={loading} size="lg" className="w-full">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Posting...</> : <>Post My Request</>}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center animate-snap-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
              <BadgeCheck className="h-8 w-8 text-success-foreground" />
            </div>
            <div className="font-display text-2xl mt-4">Post Published!</div>
            <div className="text-sm text-muted-foreground mt-1">We've shared your request with the community.</div>
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
