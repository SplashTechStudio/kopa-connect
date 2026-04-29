import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEMO_PRODUCTS } from "@/lib/demo-data";
import { formatNaira } from "@/lib/format";
import { Filter, Lock, Search, ShoppingBag, Store } from "lucide-react";
import { ListItemSheet } from "@/components/sheets/ListItemSheet";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Marketplace types: Declutter and Marketplace.
// Storefront displays "Marketplace" items.
// Declutter displays "Declutter" items.

const Marketplace = () => {
  const location = useLocation();
  const isDeclutter = location.pathname.includes("declutter");
  const pageTitle = isDeclutter ? "Declutter" : "Storefront";
  const [q, setQ] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const { add } = useCart();
  
  // Filter items based on page context (Declutter vs Storefront)
  const items = DEMO_PRODUCTS.filter((p) => {
    const matchesContext = isDeclutter ? p.category === "Declutter" : p.category === "Marketplace";
    const matchesSearch = p.title.toLowerCase().includes(q.toLowerCase());
    return matchesContext && matchesSearch;
  });

  return (
    <AppShell title={pageTitle}>
      <ListItemSheet open={listOpen} onOpenChange={setListOpen} />

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground cursor-help">{isDeclutter ? "Sell before POP" : "Buy from verified corpers"}</div>
                <h1 className="font-display text-3xl font-semibold mt-1 cursor-help">{pageTitle}</h1>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isDeclutter ? "Post items you no longer need for other corpers to buy." : "Shop quality items from fellow corpers at great prices."}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex gap-2">
          <div className="relative flex-1 lg:w-72">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} className="h-11 pl-9 rounded-pill" placeholder="Search items…" />
          </div>
          <Button variant="default" onClick={() => setListOpen(true)}><Store className="h-4 w-4" /> List item</Button>
        </div>
      </div>

      {/* Tabs removed as per request for direct view */}

      {items.length === 0 ? (
        <div className="rounded-3xl bg-surface border border-border p-12 text-center mt-6">
          <Filter className="h-7 w-7 text-muted-foreground mx-auto" />
          <div className="font-display text-xl mt-3">Nothing matches that</div>
          <div className="text-sm text-muted-foreground mt-1">Try a different search or category.</div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {items.map((p) => (
            <article key={p.id} className="rounded-2xl bg-surface border border-border overflow-hidden kw-card-hover">
              <Link to={`/app/marketplace/${p.id}`} className="block">
                <div className="aspect-[4/3] bg-surface-alt flex items-center justify-center text-6xl">{p.img}</div>
              </Link>
              <div className="p-4">
                <Link to={`/app/marketplace/${p.id}`} className="text-sm font-semibold line-clamp-1 hover:underline">{p.title}</Link>
                <div className="text-xs text-muted-foreground mt-0.5">{p.seller} · {p.state}</div>
                <div className="flex items-center justify-between mt-3">
                  <div className="font-display text-lg font-semibold tabular">{formatNaira(p.price)}</div>
                  <Button size="sm" variant="soft" onClick={() => { add(p, 1); toast.success(`${p.title} added to cart`); }}>
                    <ShoppingBag className="h-3 w-3" /> Add
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-3xl bg-primary text-primary-foreground p-6 lg:p-8 flex flex-col lg:flex-row gap-5 items-start lg:items-center">
        <Lock className="h-8 w-8 text-accent" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-1 cursor-help">
                <div className="font-display text-xl font-semibold">Every purchase is held in Safetrade.</div>
                <div className="text-primary-foreground/70 text-sm mt-1">Your money is released to the seller only after you confirm delivery.</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Our secure escrow service ensures you get what you paid for.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button variant="hero">Learn more</Button>
      </div>
    </AppShell>
  );
};

export default Marketplace;
