import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BadgeCheck, Image as ImageIcon, Loader2, Lock, Store, CreditCard } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/demo-data";
import { toast } from "sonner";

export const ListItemSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [condition, setCondition] = useState("Used — like new");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "payment" | "done">("form");

  const reset = () => {
    setTitle(""); setPrice(""); setCategory(PRODUCT_CATEGORIES[0]);
    setCondition("Used — like new"); setDescription(""); setStep("form");
  };

  const proceedToPayment = () => {
    if (!title || !price || !description) {
      toast.error("Fill in title, price and a short description.");
      return;
    }
    setStep("payment");
  };

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setStep("done");
    toast.success(`"${title}" listed. We'll notify nearby corpers.`);
    setTimeout(() => { reset(); onOpenChange(false); }, 1400);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[92vh] overflow-y-auto">
        {step === "form" && (
          <>
            <SheetHeader className="text-left">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent text-accent-foreground self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] w-fit">
                <Store className="h-3 w-3" /> List an item
              </div>
              <SheetTitle className="font-display text-3xl">Sell to a fellow corper.</SheetTitle>
              <p className="text-sm text-muted-foreground">Every sale runs through Safetrade — your money is held until the buyer confirms delivery.</p>
            </SheetHeader>

            <div className="mt-6 grid gap-5 max-w-2xl">
              <div className="grid sm:grid-cols-2 gap-3">
                <button type="button" className="aspect-[4/3] rounded-2xl border border-dashed border-border bg-surface-alt flex flex-col items-center justify-center text-muted-foreground hover:bg-surface transition-colors">
                  <ImageIcon className="h-7 w-7" />
                  <span className="text-xs mt-2">Add photos</span>
                </button>
                <div className="grid grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square rounded-xl border border-dashed border-border bg-surface-alt" />
                  ))}
                </div>
              </div>

              <Field label="Title">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Foam mattress (6x6, used 4 mo.)" className="h-11 rounded-xl" />
              </Field>

              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Price (₦)">
                  <Input type="number" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} placeholder="18000" className="h-11 rounded-xl tabular" />
                </Field>
                <Field label="Condition">
                  <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm">
                    {["New", "Used — like new", "Used — good", "Used — fair"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Category">
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_CATEGORIES.map((c) => (
                    <button key={c} type="button" onClick={() => setCategory(c)}
                      className={`rounded-pill px-3 py-1.5 text-xs font-semibold border transition-colors ${category === c ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border hover:bg-surface-alt"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Description">
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Why are you selling? Any defects? Pickup or delivery?" className="min-h-[110px] rounded-xl" />
              </Field>

              <div className="rounded-2xl bg-surface-alt p-4 flex items-start gap-3 text-sm">
                <Lock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">Safetrade is on by default.</div>
                  <div className="text-muted-foreground mt-0.5">Buyers pay into escrow. You'll receive funds within 24 hours of delivery confirmation.</div>
                </div>
              </div>

              <Button onClick={proceedToPayment} size="lg" className="w-full">
                Continue to payment
              </Button>
            </div>
          </>
        )}
        
        {step === "payment" && (
          <div className="py-6 animate-snap-in flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
              <CreditCard className="h-8 w-8" />
            </div>
            <h2 className="font-display text-2xl font-semibold mb-2">Listing Fee</h2>
            <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
              Pay a small fee to list your item. This helps us ensure only serious sellers are on the platform and prevents off-platform scams.
            </p>
            <div className="w-full max-w-sm rounded-2xl border border-border p-5 mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Listing Fee</span>
                <span className="font-semibold">₦500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Wallet Balance</span>
                <span className="font-semibold text-success">₦45,000</span>
              </div>
            </div>
            <div className="w-full max-w-sm flex gap-3">
              <Button onClick={() => setStep("form")} variant="soft" className="flex-1">Back</Button>
              <Button onClick={submit} disabled={loading} className="flex-[2]">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</> : <>Pay ₦500 & List</>}
              </Button>
            </div>
          </div>
        )}

        {step === "done" && (
          <div className="py-12 text-center animate-snap-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
              <BadgeCheck className="h-8 w-8 text-success-foreground" />
            </div>
            <div className="font-display text-2xl mt-4">Listing live</div>
            <div className="text-sm text-muted-foreground mt-1">Corpers near you will see it within minutes.</div>
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
