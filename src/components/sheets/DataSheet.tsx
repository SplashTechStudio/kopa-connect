import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Globe, BadgeCheck, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const NETWORKS = [
  { id: "mtn", name: "MTN", color: "bg-yellow-400" },
  { id: "airtel", name: "Airtel", color: "bg-red-500" },
  { id: "glo", name: "Glo", color: "bg-green-500" },
  { id: "9mobile", name: "9mobile", color: "bg-green-800" },
];

const DATA_PLANS = [
  { id: "1", name: "1GB / 1 Day", price: 300 },
  { id: "2", name: "2.5GB / 2 Days", price: 500 },
  { id: "3", name: "5GB / 7 Days", price: 1500 },
  { id: "4", name: "10GB / 30 Days", price: 3000 },
  { id: "5", name: "20GB / 30 Days", price: 5000 },
];

export const DataSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) => {
  const [network, setNetwork] = useState(NETWORKS[0].id);
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState(DATA_PLANS[0].id);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setNetwork(NETWORKS[0].id); setPhone(""); setPlan(DATA_PLANS[0].id); setDone(false);
  };

  const submit = async () => {
    if (!phone) {
      toast.error("Please provide a phone number.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1300));
    setLoading(false);
    setDone(true);
    toast.success("Data purchase successful!");
    setTimeout(() => { reset(); onOpenChange(false); }, 1500);
  };

  const selectedPlan = DATA_PLANS.find(p => p.id === plan);

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[92vh] overflow-y-auto">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent text-accent-foreground self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] w-fit">
                <Globe className="h-3 w-3" /> Data Bundle
              </div>
              <SheetTitle className="font-display text-3xl">Buy Data</SheetTitle>
              <p className="text-sm text-muted-foreground">Stay connected with affordable data bundles.</p>
            </SheetHeader>

            <div className="mt-6 grid gap-5 max-w-2xl mx-auto">
              <Field label="Select Network">
                <div className="grid grid-cols-4 gap-3">
                  {NETWORKS.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setNetwork(n.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                        network === n.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:bg-surface-alt"
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-full ${n.color}`} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{n.name}</span>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Phone Number">
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08012345678" className="h-11 rounded-xl" />
              </Field>

              <Field label="Select Data Plan">
                <div className="grid gap-2">
                  {DATA_PLANS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlan(p.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        plan === p.id ? "border-primary bg-primary/5" : "border-border hover:bg-surface-alt"
                      }`}
                    >
                      <span className="text-sm font-semibold">{p.name}</span>
                      <span className="font-display text-sm font-bold">₦{p.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </Field>

              <div className="rounded-2xl bg-surface-alt p-4 flex items-start gap-3 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">Instant Activation.</div>
                  <div className="text-muted-foreground mt-0.5">Your data bundle is activated immediately after payment.</div>
                </div>
              </div>

              <Button onClick={submit} disabled={loading} size="lg" className="w-full">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</> : <>Buy {selectedPlan?.name}</>}
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 text-center animate-snap-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
              <BadgeCheck className="h-8 w-8 text-success-foreground" />
            </div>
            <div className="font-display text-2xl mt-4">Purchase Successful</div>
            <div className="text-sm text-muted-foreground mt-1">Data has been activated for {phone}.</div>
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
