import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Tv, Zap, BadgeCheck, ShieldCheck, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const BILL_CATEGORIES = [
  { id: "cable", label: "Cable TV", icon: Tv, providers: ["DSTV", "GOTV", "Startimes"] },
  { id: "electricity", label: "Electricity", icon: Zap, providers: ["IKEDC", "EKEDC", "AEDC", "PHED"] },
];

export const PayBillsSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [step, setStep] = useState<"select" | "details">("select");
  const [category, setCategory] = useState<typeof BILL_CATEGORIES[0] | null>(null);
  const [provider, setProvider] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setStep("select"); setCategory(null); setProvider(""); setAccountNumber(""); setAmount(""); setDone(false);
  };

  const handleCategorySelect = (cat: typeof BILL_CATEGORIES[0]) => {
    setCategory(cat);
    setProvider(cat.providers[0]);
    setStep("details");
  };

  const submit = async () => {
    if (!accountNumber || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setDone(true);
    toast.success("Bill payment successful!");
    setTimeout(() => { reset(); onOpenChange(false); }, 1500);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[92vh] overflow-y-auto">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent text-accent-foreground self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] w-fit">
                <Zap className="h-3 w-3" /> Utility Payments
              </div>
              <SheetTitle className="font-display text-3xl">Pay Bills</SheetTitle>
              <p className="text-sm text-muted-foreground">Pay for your light and TV with zero transaction fees.</p>
            </SheetHeader>

            <div className="mt-6 max-w-2xl mx-auto">
              {step === "select" ? (
                <div className="grid gap-3">
                  {BILL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat)}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-surface-alt border border-border hover:border-primary transition-all group"
                    >
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <cat.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{cat.label}</div>
                        <div className="text-xs text-muted-foreground">Quick and reliable payments</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid gap-5">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-alt border border-border">
                    {category && <category.icon className="h-5 w-5 text-primary" />}
                    <span className="font-semibold">{category?.label}</span>
                    <button onClick={() => setStep("select")} className="ml-auto text-xs text-primary font-bold">Change</button>
                  </div>

                  <Field label="Provider">
                    <select value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm">
                      {category?.providers.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </Field>

                  <Field label={category?.id === "cable" ? "SmartCard / IUC Number" : "Meter Number"}>
                    <Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="0123456789" className="h-11 rounded-xl" />
                  </Field>

                  <Field label="Amount (₦)">
                    <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))} placeholder="2000" className="h-11 rounded-xl tabular" />
                  </Field>

                  <div className="rounded-2xl bg-surface-alt p-4 flex items-start gap-3 text-sm">
                    <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold">Secured by Safetrade.</div>
                      <div className="text-muted-foreground mt-0.5">Your payment is encrypted and processed instantly.</div>
                    </div>
                  </div>

                  <Button onClick={submit} disabled={loading} size="lg" className="w-full">
                    {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</> : <>Pay {formatNaira(Number(amount)) || "Bill"}</>}
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
            <div className="font-display text-2xl mt-4">Payment Successful</div>
            <div className="text-sm text-muted-foreground mt-1">Your {category?.label} has been funded.</div>
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

const formatNaira = (amount: number) => {
  if (!amount) return "";
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);
};
