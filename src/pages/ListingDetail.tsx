import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_LISTINGS } from "@/lib/demo-data";
import { formatNaira } from "@/lib/format";
import { ArrowLeft, BadgeCheck, Bath, BedDouble, Calendar, Loader2, Lock, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const ListingDetail = () => {
  const { id } = useParams();
  const listing = useMemo(() => DEMO_LISTINGS.find((l) => l.id === id), [id]);
  const [reserving, setReserving] = useState(false);
  const [reserved, setReserved] = useState(false);

  if (!listing) {
    return (
      <AppShell title="Listing">
        <div className="rounded-3xl bg-surface border border-border p-12 text-center">
          <div className="font-display text-2xl">Listing not found</div>
          <Button asChild variant="soft" className="mt-4"><Link to="/app/accommodation"><ArrowLeft className="h-4 w-4" /> Back</Link></Button>
        </div>
      </AppShell>
    );
  }

  const reserve = async () => {
    setReserving(true);
    await new Promise((r) => setTimeout(r, 900));
    setReserving(false);
    setReserved(true);
    toast.success("Inspection booked. Landlord will reach out within 24 hours.");
  };

  return (
    <AppShell title={listing.title}>
      <Button asChild variant="ghost" size="sm" className="mb-3"><Link to="/app/accommodation"><ArrowLeft className="h-4 w-4" /> Accommodation</Link></Button>

      <div className="grid lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7">
          <div className="aspect-[5/3] rounded-3xl bg-surface-alt border border-border flex items-center justify-center text-9xl relative overflow-hidden">
            {listing.img}
            {listing.verified && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-pill bg-success px-3 py-1 text-[10px] font-bold text-success-foreground">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified
              </span>
            )}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {listing.gallery.map((g, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-surface border border-border flex items-center justify-center text-4xl">{g}</div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-surface border border-border p-6">
            <h2 className="font-display text-xl font-semibold">About this place</h2>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed text-pretty">{listing.description}</p>

            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              <Spec icon={BedDouble} label={`${listing.bedrooms} bedroom${listing.bedrooms > 1 ? "s" : ""}`} />
              <Spec icon={Bath} label={`${listing.bathrooms} bathroom${listing.bathrooms > 1 ? "s" : ""}`} />
              <Spec icon={MapPin} label={listing.distanceToPPA} />
            </div>

            <h3 className="font-display text-lg font-semibold mt-6">Amenities</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {listing.amenities.map((a) => (
                <span key={a} className="rounded-pill bg-surface-alt px-3 py-1.5 text-xs font-semibold">{a}</span>
              ))}
            </div>
          </div>
        </section>

        <aside className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-surface border border-border p-6">
            <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">{listing.type}</div>
            <h1 className="font-display text-3xl font-semibold mt-1 text-balance">{listing.title}</h1>
            <div className="text-xs text-muted-foreground mt-1.5 inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {listing.lga}, {listing.state}</div>
            <div className="font-display text-4xl font-bold tabular mt-3">{formatNaira(listing.price)}</div>

            <Button onClick={reserve} disabled={reserving || reserved} size="lg" className="w-full mt-5">
              {reserving ? <><Loader2 className="h-4 w-4 animate-spin" /> Booking…</>
                : reserved ? <><BadgeCheck className="h-4 w-4" /> Inspection booked</>
                : <><Calendar className="h-4 w-4" /> Book inspection</>}
            </Button>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="soft"><MessageCircle className="h-4 w-4" /> Message</Button>
              <Button variant="soft"><Phone className="h-4 w-4" /> Call</Button>
            </div>

            <div className="mt-5 rounded-2xl bg-surface-alt p-4 flex items-start gap-3 text-sm">
              <Lock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold">Pay rent through Safetrade.</div>
                <div className="text-muted-foreground mt-0.5">Funds are only released to the landlord after you've moved in and signed.</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-surface border border-border p-6">
            <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">Landlord</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-display font-bold flex items-center justify-center">
                {listing.landlord[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{listing.landlord}</div>
                <div className="text-xs text-muted-foreground tabular">{listing.landlordPhone}</div>
              </div>
              {listing.verified && <BadgeCheck className="h-5 w-5 text-success" />}
            </div>
            <div className="mt-4 rounded-xl bg-surface-alt p-3 text-xs flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div className="text-muted-foreground">Identity verified by a Kopa scout. Always sign your tenancy agreement on the platform — never pay outside Safetrade.</div>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
};

const Spec = ({ icon: Icon, label }: { icon: typeof BedDouble; label: string }) => (
  <div className="rounded-xl bg-surface-alt px-4 py-3 flex items-center gap-2 text-sm">
    <Icon className="h-4 w-4 text-primary" />
    <span className="font-semibold">{label}</span>
  </div>
);

export default ListingDetail;
