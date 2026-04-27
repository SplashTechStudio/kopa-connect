import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useMember } from "@/context/MemberContext";
import { BadgeCheck, LogOut, QrCode, ShieldCheck } from "lucide-react";

const Profile = () => {
  const { member, signOut } = useMember();
  if (!member) return null;

  return (
    <AppShell title="Profile">
      <div className="grid lg:grid-cols-12 gap-5">
        <section className="lg:col-span-5 rounded-3xl bg-primary text-primary-foreground p-7 relative overflow-hidden kw-noise">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.12em] opacity-70">Digital Corps ID</div>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-accent text-accent-foreground font-display text-xl font-bold flex items-center justify-center">
                {member.fullName.split(" ").map(p => p[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="font-display text-2xl font-semibold">{member.fullName}</div>
                <div className="text-sm opacity-70">{member.stateCode}</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <Field label="State" value={member.state} />
              <Field label="LGA" value={member.lga} />
              <Field label="CDS Group" value={member.cdsGroup} />
              <Field label="Call-up" value={member.callUpNumber} />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-pill bg-success px-2.5 py-1 text-[11px] font-bold text-success-foreground">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified
              </span>
              <span className="inline-flex items-center gap-1 rounded-pill bg-white/10 px-2.5 py-1 text-[11px] font-bold">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Score {member.creditScore}
              </span>
            </div>
          </div>
        </section>

        <section className="lg:col-span-4 rounded-3xl bg-surface border border-border p-7 flex flex-col items-center justify-center text-center">
          <div className="h-40 w-40 rounded-2xl bg-surface-alt flex items-center justify-center">
            <QrCode className="h-24 w-24 text-primary" />
          </div>
          <div className="font-display text-lg font-semibold mt-4">Scan to verify</div>
          <p className="text-sm text-muted-foreground mt-1">Officials can scan this code to confirm your status in seconds.</p>
        </section>

        <section className="lg:col-span-3 rounded-3xl bg-surface border border-border p-7">
          <h2 className="font-display text-lg font-semibold">Account</h2>
          <div className="mt-4 space-y-2">
            <Button asChild variant="soft" className="w-full justify-start"><Link to="/app/welfare">Welfare ticket</Link></Button>
            <Button asChild variant="soft" className="w-full justify-start"><Link to="/app/notifications">Notifications</Link></Button>
            <Button variant="soft" className="w-full justify-start">Privacy & data</Button>
            <Button variant="soft" className="w-full justify-start">Help centre</Button>
            <Button onClick={signOut} variant="outline" className="w-full justify-start">
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[10px] uppercase tracking-[0.1em] opacity-60">{label}</div>
    <div className="font-semibold text-sm mt-0.5 truncate">{value}</div>
  </div>
);

export default Profile;
