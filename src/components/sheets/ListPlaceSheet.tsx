import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BadgeCheck, Building2, Image as ImageIcon, Loader2, ShieldCheck } from "lucide-react";
import { ACCOMMODATION_TYPES, NIGERIAN_STATES } from "@/lib/demo-data";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AMENITIES = ["Prepaid meter", "Borehole", "WiFi", "AC", "Generator", "Tiled floor", "Wardrobe", "Security", "Furnished"];

export const ListPlaceSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState(ACCOMMODATION_TYPES[0]);
  const [price, setPrice] = useState<number | "">("");
  const [state, setState] = useState("Lagos");
  const [lga, setLga] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [amenities, setAmenities] = useState<string[]>(["Tiled floor", "Borehole"]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const toggleAmenity = (a: string) =>
    setAmenities((curr) => curr.includes(a) ? curr.filter((x) => x !== a) : [...curr, a]);

  const reset = () => {
    setTitle(""); setType(ACCOMMODATION_TYPES[0]); setPrice(""); setState("Lagos"); setLga("");
    setBedrooms(1); setBathrooms(1); setAmenities(["Tiled floor", "Borehole"]); setDescription(""); setDone(false);
  };

  const submit = async () => {
    if (!title || !price || !lga || !description) {
      toast.error("Add title, LGA, price and description.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);
    setDone(true);
    toast.success("Submitted for verification — usually approved in 24h.");
    setTimeout(() => { reset(); onOpenChange(false); }, 1500);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[92vh] overflow-y-auto">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent text-accent-foreground self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] w-fit">
                <Building2 className="h-3 w-3" /> List my place
              </div>
              <SheetTitle className="font-display text-3xl">Rent it out to verified corpers.</SheetTitle>
              <p className="text-sm text-muted-foreground">We verify every listing before it goes public — no scams, no double-booking.</p>
            </SheetHeader>

            <div className="mt-6 grid gap-5 max-w-2xl">
              <button type="button" className="aspect-[16/7] rounded-2xl border border-dashed border-border bg-surface-alt flex flex-col items-center justify-center text-muted-foreground hover:bg-surface transition-colors">
                <ImageIcon className="h-8 w-8" />
                <span className="text-xs mt-2">Drop photos here · 4 minimum</span>
              </button>

              <Field label="Title"><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Self-con near Ikeja secretariat" className="h-11 rounded-xl" /></Field>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Type">
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="h-11 rounded-xl text-sm">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ACCOMMODATION_TYPES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Annual rent (₦)">
                  <Input type="number" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} placeholder="220000" className="h-11 rounded-xl tabular" />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
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
                <Field label="LGA"><Input value={lga} onChange={(e) => setLga(e.target.value)} placeholder="e.g. Ikeja" className="h-11 rounded-xl" /></Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Bedrooms">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((n) => (
                      <button key={n} type="button" onClick={() => setBedrooms(n)} className={`h-11 flex-1 rounded-xl border text-sm font-semibold ${bedrooms === n ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border"}`}>{n}</button>
                    ))}
                  </div>
                </Field>
                <Field label="Bathrooms">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((n) => (
                      <button key={n} type="button" onClick={() => setBathrooms(n)} className={`h-11 flex-1 rounded-xl border text-sm font-semibold ${bathrooms === n ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border"}`}>{n}</button>
                    ))}
                  </div>
                </Field>
              </div>

              <Field label="Amenities">
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.map((a) => (
                    <button key={a} type="button" onClick={() => toggleAmenity(a)}
                      className={`rounded-pill px-3 py-1.5 text-xs font-semibold border transition-colors ${amenities.includes(a) ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border hover:bg-surface-alt"}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Description">
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell corpers about the area, the landlord, distance to the secretariat…" className="min-h-[110px] rounded-xl" />
              </Field>

              <div className="rounded-2xl bg-surface-alt p-4 flex items-start gap-3 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">Verification within 24 hours.</div>
                  <div className="text-muted-foreground mt-0.5">A CorperOne scout visits to confirm photos and meet the landlord — then your listing is live.</div>
                </div>
              </div>

              <Button onClick={submit} disabled={loading} size="lg" className="w-full">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <>Submit for verification</>}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center animate-snap-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
              <BadgeCheck className="h-8 w-8 text-success-foreground" />
            </div>
            <div className="font-display text-2xl mt-4">Submitted for verification</div>
            <div className="text-sm text-muted-foreground mt-1">We'll text you within 24 hours.</div>
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
