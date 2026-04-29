import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_LISTINGS, DEMO_ROOMMATES } from "@/lib/demo-data";
import { ListPlaceSheet } from "@/components/sheets/ListPlaceSheet";
import { AccommodationIntentSheet, AccommodationIntent } from "@/components/sheets/AccommodationIntentSheet";
import { formatNaira } from "@/lib/format";
import { BadgeCheck, Building2, MapPin, Users, Search, UserPlus, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Accommodation = () => {
  const [listOpen, setListOpen] = useState(false);
  const [intentOpen, setIntentOpen] = useState(false);
  const [activeIntent, setActiveIntent] = useState<AccommodationIntent>("looking_for_place");

  const openIntent = (intent: AccommodationIntent) => {
    if (intent === "have_place_need_tenant") {
      setListOpen(true);
    } else {
      setActiveIntent(intent);
      setIntentOpen(true);
    }
  };

  return (
    <AppShell title="Accommodation">
      <ListPlaceSheet open={listOpen} onOpenChange={setListOpen} />
      <AccommodationIntentSheet open={intentOpen} onOpenChange={setIntentOpen} intent={activeIntent} />

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground cursor-help">Verified landlords · Corper-to-corper transfers</div>
                <h1 className="font-display text-3xl font-semibold mt-1 cursor-help">Find a place. Find a roommate.</h1>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Verified accommodation listings and roommate matching service.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button onClick={() => openIntent("have_place_need_tenant")}><Building2 className="h-4 w-4" /> List my place</Button>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <section className="rounded-3xl bg-surface border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Building2 className="h-5 w-5" /></div>
            <h2 className="font-display text-xl font-semibold">Accommodation</h2>
          </div>
          <div className="space-y-3">
            <button onClick={() => openIntent("looking_for_place")} className="w-full text-left p-4 rounded-2xl border border-border hover:border-primary hover:bg-surface-alt transition-all group">
              <div className="font-semibold group-hover:text-primary transition-colors">Corp member Looking for Accommodation?</div>
              <div className="text-xs text-muted-foreground mt-1">Browse verified lodges, NCCF addresses, and apartments.</div>
            </button>
            <button onClick={() => openIntent("have_place_need_tenant")} className="w-full text-left p-4 rounded-2xl border border-border hover:border-primary hover:bg-surface-alt transition-all group">
              <div className="font-semibold group-hover:text-primary transition-colors">Looking for corp members who needs Accommodation?</div>
              <div className="text-xs text-muted-foreground mt-1">List your property for verified corp members.</div>
            </button>
          </div>
        </section>

        <section className="rounded-3xl bg-surface border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Users className="h-5 w-5" /></div>
            <h2 className="font-display text-xl font-semibold">Roommate Finder</h2>
          </div>
          <div className="space-y-3">
            <button onClick={() => openIntent("need_roommate")} className="w-full text-left p-4 rounded-2xl border border-border hover:border-primary hover:bg-surface-alt transition-all group">
              <div className="font-semibold group-hover:text-primary transition-colors">Are you a corp member in need of a shared accommodation?</div>
              <div className="text-xs text-muted-foreground mt-1">Find members with an existing place looking to split rent.</div>
            </button>
            <button onClick={() => openIntent("have_room_need_roommate")} className="w-full text-left p-4 rounded-2xl border border-border hover:border-primary hover:bg-surface-alt transition-all group">
              <div className="font-semibold group-hover:text-primary transition-colors">Do You Have an Accommodation and Looking for corp roommate?</div>
              <div className="text-xs text-muted-foreground mt-1">Create a roommate request for your current place.</div>
            </button>
          </div>
        </section>
      </div>

      <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "NCCF Addresses", "Lodges", "Apartments", "Self Contain"].map((t) => (
          <button key={t} className="rounded-pill px-4 py-1.5 text-xs font-semibold border bg-surface border-border hover:bg-surface-alt whitespace-nowrap">
            {t}
          </button>
        ))}
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <h2 className="font-display text-xl font-semibold mt-6 cursor-help flex items-center gap-2">Available listings <Info className="h-4 w-4 opacity-50" /></h2>
          </TooltipTrigger>
          <TooltipContent>
            <p>Verified properties available for rent in your preferred state and LGA.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {DEMO_LISTINGS.map((l) => (
          <Link to={`/app/accommodation/${l.id}`} key={l.id} className="rounded-2xl bg-surface border border-border overflow-hidden kw-card-hover block">
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
          </Link>
        ))}
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <h2 className="font-display text-xl font-semibold mt-10 flex items-center gap-2 cursor-help">
              <Users className="h-5 w-5" /> Roommate finder <Info className="h-4 w-4 opacity-50" />
            </h2>
          </TooltipTrigger>
          <TooltipContent>
            <p>Connect with other verified corp members looking for shared housing.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {DEMO_ROOMMATES.map((r) => (
          <Link to={`/app/roommate/${r.id}`} key={r.id} className="rounded-2xl bg-surface border border-border p-5 kw-card-hover block">
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
              <div className="text-sm">Rent: <span className="font-semibold tabular">{formatNaira(r.budget)}</span></div>
              <Button size="sm" variant="soft">Connect</Button>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
};

export default Accommodation;
