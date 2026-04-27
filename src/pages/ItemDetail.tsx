import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_PRODUCTS } from "@/lib/demo-data";
import { formatNaira } from "@/lib/format";
import { ArrowLeft, BadgeCheck, ChevronRight, Lock, MapPin, MessageCircle, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();

  const product = useMemo(() => DEMO_PRODUCTS.find((p) => p.id === id), [id]);
  const related = useMemo(
    () => DEMO_PRODUCTS.filter((p) => p.id !== id && p.category === product?.category).slice(0, 4),
    [id, product?.category],
  );

  if (!product) {
    return (
      <AppShell title="Item">
        <div className="rounded-3xl bg-surface border border-border p-12 text-center">
          <div className="font-display text-2xl">Item not found</div>
          <Button asChild variant="soft" className="mt-4"><Link to="/app/marketplace"><ArrowLeft className="h-4 w-4" /> Back to marketplace</Link></Button>
        </div>
      </AppShell>
    );
  }

  const onBuy = () => {
    add(product, 1);
    navigate("/app/cart");
  };

  const onAdd = () => {
    add(product, 1);
    toast.success(`${product.title} added to cart`);
  };

  return (
    <AppShell title={product.title}>
      <Button asChild variant="ghost" size="sm" className="mb-3"><Link to="/app/marketplace"><ArrowLeft className="h-4 w-4" /> Marketplace</Link></Button>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Gallery */}
        <section className="lg:col-span-7">
          <div className="aspect-[5/4] rounded-3xl bg-surface-alt border border-border flex items-center justify-center text-9xl">
            {product.img}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.gallery.map((g, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-surface border border-border flex items-center justify-center text-4xl">
                {g}
              </div>
            ))}
          </div>
        </section>

        {/* Buy panel */}
        <aside className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-surface border border-border p-6">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">
              <span>{product.category}</span><span>·</span><span>{product.condition}</span>
            </div>
            <h1 className="font-display text-3xl font-semibold mt-1.5 text-balance">{product.title}</h1>
            <div className="font-display text-4xl font-bold tabular mt-3">{formatNaira(product.price)}</div>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {product.lga}, {product.state}
              <span>·</span><span>{product.postedAt}</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button onClick={onAdd} variant="soft" size="lg"><ShoppingBag className="h-4 w-4" /> Add to cart</Button>
              <Button onClick={onBuy} size="lg"><Lock className="h-4 w-4" /> Buy with Safetrade</Button>
            </div>

            <div className="mt-4 rounded-2xl bg-surface-alt p-4 flex items-start gap-3 text-sm">
              <Lock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold">Protected by Safetrade.</div>
                <div className="text-muted-foreground mt-0.5">Your money is held in escrow and only released when you confirm delivery.</div>
              </div>
            </div>
          </div>

          {/* Seller */}
          <div className="rounded-3xl bg-surface border border-border p-6">
            <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">Seller</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-display font-bold flex items-center justify-center">
                {product.seller.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1">
                <div className="font-semibold flex items-center gap-1.5">{product.seller} <BadgeCheck className="h-4 w-4 text-success" /></div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" /> {product.sellerRating}</span>
                  <span>·</span><span>{product.sellerSales} sales</span>
                </div>
              </div>
              <Button variant="ghost" size="icon-sm" aria-label="Chat seller"><MessageCircle className="h-4 w-4" /></Button>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <Stat icon={ShieldCheck} label="Verified corper" />
              <Stat icon={Truck} label="Pickup or delivery" />
            </div>
          </div>
        </aside>

        {/* Description */}
        <section className="lg:col-span-7 rounded-3xl bg-surface border border-border p-6">
          <h2 className="font-display text-xl font-semibold">Details</h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed text-pretty">{product.description}</p>
          <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
            <DetailRow label="Condition" value={product.condition} />
            <DetailRow label="Category" value={product.category} />
            <DetailRow label="Location" value={`${product.lga}, ${product.state}`} />
            <DetailRow label="Stock" value={`${product.inStock} available`} />
          </div>
        </section>

        {/* Related */}
        <section className="lg:col-span-12 mt-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-xl font-semibold">More like this</h2>
            <Button asChild variant="ghost" size="sm"><Link to="/app/marketplace">All <ChevronRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link key={p.id} to={`/app/marketplace/${p.id}`} className="rounded-2xl bg-surface border border-border overflow-hidden kw-card-hover block">
                <div className="aspect-[4/3] bg-surface-alt flex items-center justify-center text-6xl">{p.img}</div>
                <div className="p-4">
                  <div className="text-sm font-semibold line-clamp-1">{p.title}</div>
                  <div className="font-display text-base font-semibold tabular mt-1">{formatNaira(p.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
};

const Stat = ({ icon: Icon, label }: { icon: typeof ShieldCheck; label: string }) => (
  <div className="rounded-xl bg-surface-alt p-3 flex items-center gap-2">
    <Icon className="h-4 w-4 text-primary" />
    <span>{label}</span>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl bg-surface-alt px-4 py-3">
    <div className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{label}</div>
    <div className="font-semibold mt-0.5">{value}</div>
  </div>
);

export default ItemDetail;
