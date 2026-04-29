import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_ROOMMATES } from "@/lib/demo-data";
import { formatNaira } from "@/lib/format";
import { ArrowLeft, BadgeCheck, Calendar, Loader2, MapPin, MessageCircle, Sparkles, Wallet } from "lucide-react";
import { toast } from "sonner";

const RoommateDetail = () => {
  const { id } = useParams();
  const r = useMemo(() => DEMO_ROOMMATES.find((x) => x.id === id), [id]);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  if (!r) {
    return (
      <AppShell title="Roommate">
        <div className="rounded-3xl bg-surface border border-border p-12 text-center">
          <div className="font-display text-2xl">Profile not found</div>
          <Button asChild variant="soft" className="mt-4"><Link to="/app/accommodation"><ArrowLeft className="h-4 w-4" /> Back</Link></Button>
        </div>
      </AppShell>
    );
  }

  const connect = async () => {
    setConnecting(true);
    await new Promise((res) => setTimeout(res, 800));
    setConnecting(false);
    setConnected(true);
    toast.success(`Request sent to ${r.name}. They'll see your verified profile.`);
  };

  return (
    <AppShell title={r.name}>
      <Button asChild variant="ghost" size="sm" className="mb-3"><Link to="/app/accommodation"><ArrowLeft className="h-4 w-4" /> Accommodation</Link></Button>

      <div className="grid lg:grid-cols-12 gap-6">
        <section className="lg:col-span-5 rounded-3xl bg-primary text-primary-foreground p-7 relative overflow-hidden kw-noise">
          <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.12em] opacity-70">Roommate match</div>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-accent text-accent-foreground font-display text-2xl font-bold flex items-center justify-center">
                {r.name.split(" ").map((p) => p[0]).join("")}
              </div>
              <div>
                <div className="font-display text-2xl font-semibold flex items-center gap-2">
                  {r.name} {r.verified && <BadgeCheck className="h-5 w-5 text-accent" />}
                </div>
                <div className="text-sm opacity-70">{r.age} yrs · {r.occupation}</div>
                <div className="text-xs opacity-70 inline-flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {r.lga}, {r.state}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Stat label="Rent" value={formatNaira(r.budget)} />
              <Stat label="Cleanliness" value={`${r.cleanliness}/10`} />
              <Stat label="Social" value={`${r.socialBattery}/10`} />
            </div>

            <Button onClick={connect} disabled={connecting || connected} size="lg" variant="hero" className="w-full mt-6">
              {connecting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                : connected ? <><BadgeCheck className="h-4 w-4" /> Request sent</>
                : <><Sparkles className="h-4 w-4" /> Send connect request</>}
            </Button>
          </div>
        </section>

        <section className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl bg-surface border border-border p-6">
            <h2 className="font-display text-xl font-semibold">About</h2>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed text-pretty">{r.bio}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-surface border border-border p-6">
              <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">Details</div>
              <div className="flex flex-wrap gap-2 mt-3">
                {r.habits.map((h) => <span key={h} className="rounded-pill bg-surface-alt px-3 py-1.5 text-xs font-semibold">{h}</span>)}
              </div>
            </div>
            <div className="rounded-3xl bg-surface border border-border p-6 space-y-3">
              <Row icon={Wallet} label="Rent" value={formatNaira(r.budget)} />
              <Row icon={Calendar} label="Moves in" value={r.movesIn} />
              <Row icon={MessageCircle} label="Smokes" value={r.smokes ? "Yes" : "No"} />
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-white/10 px-3 py-3">
    <div className="text-[10px] uppercase tracking-[0.1em] opacity-70">{label}</div>
    <div className="font-display text-base font-bold tabular mt-1">{value}</div>
  </div>
);

const Row = ({ icon: Icon, label, value }: { icon: typeof Wallet; label: string; value: string }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="inline-flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4" /> {label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default RoommateDetail;
