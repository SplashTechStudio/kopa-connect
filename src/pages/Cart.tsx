import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatNaira } from "@/lib/format";
import { ArrowLeft, BadgeCheck, Loader2, Lock, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import { toast } from "sonner";

const SAFETRADE_FEE = 0; // free for corpers
const DELIVERY = 1_500;

const Cart = () => {
  const { items, subtotal, setQuantity, remove, clear } = useCart();
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);

  const total = subtotal + (items.length > 0 ? DELIVERY : 0) + SAFETRADE_FEE;

  const checkout = async () => {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 1100));
    setPaying(false);
    setDone(true);
    toast.success(`${formatNaira(total)} held in Safetrade. Sellers notified.`);
    setTimeout(() => {
      clear();
      navigate("/app/marketplace");
    }, 1800);
  };

  if (done) {
    return (
      <AppShell title="Cart">
        <div className="rounded-3xl bg-surface border border-border p-12 text-center max-w-lg mx-auto animate-snap-in">
          <div className="mx-auto h-16 w-16 rounded-full bg-success flex items-center justify-center">
            <BadgeCheck className="h-8 w-8 text-success-foreground" />
          </div>
          <div className="font-display text-2xl mt-4">Held in Safetrade</div>
          <div className="text-sm text-muted-foreground mt-1">Sellers have 24 hours to confirm and ship. We'll notify you the moment they do.</div>
        </div>
      </AppShell>
    );
  }

  if (items.length === 0) {
    return (
      <AppShell title="Cart">
        <div className="rounded-3xl bg-surface border border-border p-12 text-center max-w-lg mx-auto">
          <div className="mx-auto h-16 w-16 rounded-full bg-surface-alt flex items-center justify-center">
            <ShoppingBag className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="font-display text-2xl mt-4">Your cart is empty</div>
          <div className="text-sm text-muted-foreground mt-1">Find verified corper deals in the marketplace.</div>
          <Button asChild className="mt-5"><Link to="/app/marketplace">Browse marketplace</Link></Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Cart">
      <Button asChild variant="ghost" size="sm" className="mb-3"><Link to="/app/marketplace"><ArrowLeft className="h-4 w-4" /> Continue shopping</Link></Button>

      <div className="grid lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8 space-y-3">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="rounded-2xl bg-surface border border-border p-4 flex items-center gap-4">
              <Link to={`/app/marketplace/${product.id}`} className="h-20 w-20 rounded-xl bg-surface-alt flex items-center justify-center text-4xl shrink-0">
                {product.img}
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/app/marketplace/${product.id}`} className="font-semibold line-clamp-1 hover:underline">{product.title}</Link>
                <div className="text-xs text-muted-foreground mt-0.5">{product.seller} · {product.lga}, {product.state}</div>
                <div className="font-display text-lg font-semibold tabular mt-1">{formatNaira(product.price * quantity)}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="inline-flex items-center rounded-pill border border-border bg-surface-alt h-9">
                  <button onClick={() => setQuantity(product.id, quantity - 1)} className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="w-7 text-center text-sm font-semibold tabular">{quantity}</span>
                  <button onClick={() => setQuantity(product.id, quantity + 1)} className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <button onClick={() => remove(product.id)} className="text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1"><Trash2 className="h-3 w-3" /> Remove</button>
              </div>
            </div>
          ))}
        </section>

        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl bg-surface border border-border p-6">
            <h2 className="font-display text-xl font-semibold">Order summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <Row label={`Subtotal (${items.length} item${items.length > 1 ? "s" : ""})`} value={formatNaira(subtotal)} />
              <Row label="Delivery (within state)" value={formatNaira(DELIVERY)} />
              <Row label="Safetrade fee" value="Free" />
              <div className="h-px bg-border my-2" />
              <Row label="Total" value={formatNaira(total)} bold />
            </div>

            <Button onClick={checkout} disabled={paying} size="lg" className="w-full mt-5">
              {paying ? <><Loader2 className="h-4 w-4 animate-spin" /> Securing payment…</> : <><Lock className="h-4 w-4" /> Pay with Safetrade</>}
            </Button>
            <p className="text-[11px] text-muted-foreground mt-3 text-center">Charged to wallet · funds released on delivery confirmation</p>
          </div>

          <div className="rounded-3xl bg-primary text-primary-foreground p-5">
            <div className="flex items-center gap-2 text-sm"><ShieldCheck className="h-4 w-4 text-accent" /> Safetrade guarantee</div>
            <div className="text-xs opacity-70 mt-2 leading-relaxed">If your item never arrives or doesn't match the listing, we refund your wallet within 24 hours. No tickets, no calls.</div>
          </div>
          <div className="rounded-3xl bg-surface border border-border p-5 text-sm flex items-start gap-3">
            <Truck className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <div className="font-semibold">Most items ship within 48h</div>
              <div className="text-muted-foreground text-xs mt-0.5">Sellers in your state can also offer pickup at the secretariat.</div>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
};

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className={`tabular ${bold ? "font-bold text-base" : "font-semibold"}`}>{value}</span>
  </div>
);

export default Cart;
