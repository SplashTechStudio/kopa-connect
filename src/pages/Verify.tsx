import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgeCheck, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { useMember } from "@/context/MemberContext";
import { identityApi, ApiError } from "@/lib/api";
import { DEMO_MEMBER } from "@/lib/demo-data";
import { toast } from "sonner";

const Verify = () => {
  const { setMember, signInDemo } = useMember();
  const navigate = useNavigate();
  const [callUpNumber, setCallUpNumber] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  const handleVerify = async () => {
    if (!callUpNumber.trim() || !stateCode.trim()) {
      toast.error("Enter both your Call-Up Number and State Code.");
      return;
    }
    setLoading(true);
    try {
      const member = await identityApi.verify(callUpNumber.trim(), stateCode.trim());
      setMember(member);
      setStep("success");
    } catch (err) {
      // Backend not reachable / rejected — fall back to demo verification so the
      // app remains explorable. Surface a friendly message either way.
      const msg =
        err instanceof ApiError
          ? "We couldn't verify you against NYSC right now. Loading a demo profile so you can explore."
          : "Network is offline. Loading a demo profile so you can explore.";
      toast.message(msg);
      setMember({
        ...DEMO_MEMBER,
        callUpNumber: callUpNumber.trim(),
        stateCode: stateCode.trim(),
      });
      setStep("success");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="container py-6 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <Logo />
        <div className="w-12" />
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {step === "form" && (
            <div className="rounded-3xl bg-surface border border-border p-8 shadow-md animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-pill bg-surface-alt px-3 py-1 text-[10px] uppercase tracking-[0.12em] font-semibold text-primary">
                <ShieldCheck className="h-3 w-3" /> Step 1 of 2
              </div>
              <h1 className="font-display text-3xl font-semibold mt-4 text-balance">
                Verify with NYSC.
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Your details are checked against the NYSC database. We never share them with third parties.
              </p>

              <div className="mt-7 space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground">
                    Call-Up Number
                  </label>
                  <Input
                    placeholder="NYSC/LAG/2024/123456"
                    value={callUpNumber}
                    onChange={(e) => setCallUpNumber(e.target.value)}
                    className="h-12 mt-1.5 rounded-xl text-base"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground">
                    State Code
                  </label>
                  <Input
                    placeholder="LA/24A/1234"
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value.toUpperCase())}
                    className="h-12 mt-1.5 rounded-xl text-base"
                  />
                </div>

                <Button onClick={handleVerify} disabled={loading} size="lg" className="w-full mt-2">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Verifying with NYSC…
                    </>
                  ) : (
                    <>Verify identity <ArrowRight /></>
                  )}
                </Button>

                <div className="relative pt-2">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
                  <div className="relative flex justify-center">
                    <span className="bg-surface px-3 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                      Just exploring?
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="soft" onClick={() => { signInDemo(false); navigate("/app"); }}>
                    Demo · Member
                  </Button>
                  <Button variant="soft" onClick={() => { signInDemo(true); navigate("/app/admin"); }}>
                    Demo · NYSC Admin
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="rounded-3xl bg-primary text-primary-foreground p-8 shadow-lg animate-snap-in text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center animate-snap-in">
                <BadgeCheck className="h-8 w-8 text-success-foreground" />
              </div>
              <h2 className="font-display text-3xl font-semibold mt-5">Verified Corps Member</h2>
              <p className="text-primary-foreground/70 mt-2">
                Your Digital Corps ID has been issued. You can now use CorperOne.
              </p>
              <Button
                size="lg"
                variant="hero"
                className="mt-7 w-full"
                onClick={() => navigate("/app")}
              >
                Open my dashboard <ArrowRight />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Verify;
