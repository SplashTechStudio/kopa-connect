import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_LISTINGS, DEMO_ROOMMATES } from "@/lib/demo-data";
import { formatNaira } from "@/lib/format";
import { BadgeCheck, Building2, MapPin, Users } from "lucide-react";

const Accommodation = () => {
  return (
    <AppShell title="Accommodation">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">Verified landlords · Corper-to-corper transfers</div>
          <h1 className="font-display text-3xl font-semibold mt-1">Find a place. Find a roommate.</h1>
        </div>
        <Button><Building2 className="h-4 w-4" /> List my place</Button>
      </div>

      <h2 className="font-display text-xl font-semibold mt-8">Available listings</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {DEMO_LISTINGS.map((l) => (
          <article key={l.id} className="rounded-2xl bg-surface border border-border overflow-hidden kw-card-hover">
            <div className="relative aspect-[5/3] bg-surface-alt flex items-center justify-center text-6xl">
              {l.img}
              {l.verified && (
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-pill bg-success px-2 py-0.5 text-[10px] font-bold text-success-foreground">
                  <BadgeCheck className="h-3 w-3" /> Verified
                </span>
              )}
            </div>
            <div className="p-4">
              <div className="font-semibold">{l.title}</div>
              <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {l.lga}, {l.state}</div>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <div className="font-display text-lg font-semibold tabular">{formatNaira(l.price)}</div>
                  <div className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{l.type}</div>
                </div>
                <Button size="sm" variant="soft">View</Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <h2 className="font-display text-xl font-semibold mt-10 flex items-center gap-2"><Users className="h-5 w-5" /> Roommate finder</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {DEMO_ROOMMATES.map((r) => (
          <article key={r.id} className="rounded-2xl bg-surface border border-border p-5 kw-card-hover">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-display font-bold flex items-center justify-center">
                {r.name.split(" ").map(p => p[0]).join("")}
              </div>
              <div>
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.age} · {r.state}</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 italic">"{r.vibe}"</p>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm">Budget: <span className="font-semibold tabular">{formatNaira(r.budget)}</span></div>
              <Button size="sm" variant="soft">Connect</Button>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
};

export default Accommodation;
