import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { Loader2, ShieldCheck, BadgeCheck, ArrowRight, User, MapPin, Building2, Wallet } from "lucide-react";
import { NIGERIAN_STATES } from "@/lib/demo-data";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    callUp: "",
    stateCode: "",
    fullName: "",
    email: "",
    state: "Lagos",
    lga: "",
    bankAccount: "",
    bankName: "Access Bank",
    startMonth: "2024-04",
    endMonth: "2025-03",
  });

  const next = async () => {
    if (step === 1) {
      if (!formData.callUp || !formData.stateCode) {
        toast.error("Please provide both Call-up and State numbers.");
        return;
      }
      setLoading(true);
      // Simulate NYSC verification
      await new Promise(r => setTimeout(r, 2500));
      setLoading(false);
      setStep(2);
      toast.success("NYSC Identity Verified!");
    } else if (step === 2) {
      if (!formData.fullName || !formData.email) {
        toast.error("Please fill in your personal details.");
        return;
      }
      setStep(3);
    } else {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1500));
      setLoading(false);
      toast.success("Registration complete! Welcome to CorperOne.");
      navigate("/app");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar - Branding */}
      <div className="hidden md:flex md:w-[40%] bg-primary p-12 flex-col justify-between relative overflow-hidden text-primary-foreground">
        <div className="absolute top-0 right-0 p-20 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <Logo variant="light" className="scale-110" />
          <div className="mt-20">
            <h1 className="text-5xl font-display font-bold leading-tight">Digital infrastructure for the modern Corper.</h1>
            <p className="mt-6 text-primary-foreground/70 text-lg max-w-sm">Banking, Community, and Career growth built exclusively for you.</p>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-2 text-sm font-semibold opacity-70">
          <ShieldCheck className="h-5 w-5" /> Secured with bank-grade encryption
        </div>
      </div>

      {/* Main Content - Wizard */}
      <div className="flex-1 p-6 md:p-20 flex flex-col justify-center max-w-2xl mx-auto w-full">
        <div className="mb-10">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${step >= i ? "bg-primary" : "bg-surface-alt"}`} />
            ))}
          </div>
          <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Step {step} of 3</div>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <header>
              <h2 className="text-3xl font-display font-bold">Let's verify your identity</h2>
              <p className="text-muted-foreground mt-2">Enter your NYSC details to fetch your profile securely.</p>
            </header>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Call-up Number</label>
                <Input 
                  placeholder="NYSC/LAG/2024/XXXXXX" 
                  value={formData.callUp}
                  onChange={e => setFormData({...formData, callUp: e.target.value.toUpperCase()})}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">State Code</label>
                <Input 
                  placeholder="LA/24A/XXXX" 
                  value={formData.stateCode}
                  onChange={e => setFormData({...formData, stateCode: e.target.value.toUpperCase()})}
                  className="h-12 rounded-xl"
                />
              </div>
            </div>
            <Button onClick={next} disabled={loading} size="lg" className="w-full h-12 rounded-xl font-bold">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Validating NYSC Details...</> : <>Verify Details <ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <header>
              <h2 className="text-3xl font-display font-bold">Complete your KYC</h2>
              <p className="text-muted-foreground mt-2">Tell us a bit more about yourself to set up your wallet.</p>
            </header>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Full Name</label>
                <Input 
                  placeholder="Adaeze Okonkwo" 
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Email Address</label>
                <Input 
                  type="email"
                  placeholder="adaeze@gmail.com" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Create Password</label>
                <Input 
                  type="password"
                  placeholder="••••••••" 
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">State of Service</label>
                  <Select 
                    value={formData.state}
                    onValueChange={value => setFormData({...formData, state: value})}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {NIGERIAN_STATES.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Current LGA</label>
                  <Input 
                    placeholder="Ikeja" 
                    value={formData.lga}
                    onChange={e => setFormData({...formData, lga: e.target.value})}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep(1)} size="lg" className="h-12 rounded-xl">Back</Button>
              <Button onClick={next} size="lg" className="flex-1 h-12 rounded-xl font-bold">Continue</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <header>
              <h2 className="text-3xl font-display font-bold">Service & Finance</h2>
              <p className="text-muted-foreground mt-2">Final step to link your allowance for advances and savings.</p>
            </header>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">NYSC Bank Account Number</label>
                <Input 
                  placeholder="0123456789" 
                  maxLength={10}
                  value={formData.bankAccount}
                  onChange={e => setFormData({...formData, bankAccount: e.target.value})}
                  className="h-12 rounded-xl"
                />
                <p className="text-[10px] text-muted-foreground">The account where you receive your monthly ₦33k stipend.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Month Started Service</label>
                  <Input 
                    type="month"
                    value={formData.startMonth}
                    onChange={e => setFormData({...formData, startMonth: e.target.value})}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Expected POP Month</label>
                  <Input 
                    type="month"
                    value={formData.endMonth}
                    onChange={e => setFormData({...formData, endMonth: e.target.value})}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-surface-alt p-5 flex items-start gap-4">
              <BadgeCheck className="h-6 w-6 text-success shrink-0" />
              <div>
                <div className="font-semibold text-sm">Escrow Protection Active</div>
                <p className="text-xs text-muted-foreground mt-1">Your data is stored securely. CorperOne is a CBN licensed platform.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep(2)} size="lg" className="h-12 rounded-xl">Back</Button>
              <Button onClick={next} disabled={loading} size="lg" className="flex-1 h-12 rounded-xl font-bold">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating Account...</> : <>Finish Registration</>}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
