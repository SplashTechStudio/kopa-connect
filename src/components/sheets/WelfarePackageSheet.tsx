import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BadgeCheck, HeartHandshake, Loader2, ShieldCheck, Gift, Utensils, Stethoscope, Bus } from "lucide-react";
import { toast } from "sonner";

const PACKAGE_TYPES = [
  { id: "medical", label: "Medical Support", icon: Stethoscope, color: "text-red-500 bg-red-50" },
  { id: "food", label: "Food Provisions", icon: Utensils, color: "text-orange-500 bg-orange-50" },
  { id: "transport", label: "Transport Subsidy", icon: Bus, color: "text-blue-500 bg-blue-50" },
  { id: "material", label: "Material Needs", icon: Gift, color: "text-purple-500 bg-purple-50" },
];

export const WelfarePackageSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [selectedType, setSelectedType] = useState(PACKAGE_TYPES[0].id);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setSelectedType(PACKAGE_TYPES[0].id); setReason(""); setDone(false);
  };

  const submit = async () => {
    if (!reason) {
      toast.error("Please provide a reason for your request.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setDone(true);
    toast.success("Welfare request submitted! Our team will review it.");
    setTimeout(() => { reset(); onOpenChange(false); }, 1500);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[92vh] overflow-y-auto">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent text-accent-foreground self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] w-fit">
                <HeartHandshake className="h-3 w-3" /> Welfare Fund
              </div>
              <SheetTitle className="font-display text-3xl">Request a Welfare Package</SheetTitle>
              <p className="text-sm text-muted-foreground">The Welfare Fund is here to support corpers in genuine need. Select a category and tell us more.</p>
            </SheetHeader>

            <div className="mt-6 grid gap-5 max-w-2xl">
              <Field label="Package Type">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PACKAGE_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedType(t.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                        selectedType === t.id 
                          ? "border-primary bg-primary/5 ring-1 ring-primary" 
                          : "border-border hover:bg-surface-alt"
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${t.color}`}>
                        <t.icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold text-center leading-tight uppercase tracking-wider">{t.label}</span>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Reason for Request">
                <Textarea 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)} 
                  placeholder="Please describe your current situation and why you're requesting this package. Be as specific as possible to help us prioritize." 
                  className="min-h-[140px] rounded-xl" 
                />
              </Field>

              <div className="rounded-2xl bg-surface-alt p-4 flex items-start gap-3 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">Confidential & Fair.</div>
                  <div className="text-muted-foreground mt-0.5">Your request is handled with strict confidentiality. Payouts are based on fund availability and urgency.</div>
                </div>
              </div>

              <Button onClick={submit} disabled={loading} size="lg" className="w-full">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <>Submit Request</>}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center animate-snap-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
              <BadgeCheck className="h-8 w-8 text-success-foreground" />
            </div>
            <div className="font-display text-2xl mt-4">Request Submitted</div>
            <div className="text-sm text-muted-foreground mt-1">We'll review your case and get back to you within 3-5 working days.</div>
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
