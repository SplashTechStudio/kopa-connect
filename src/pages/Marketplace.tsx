import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEMO_PRODUCTS } from "@/lib/demo-data";
import { formatNaira } from "@/lib/format";
import { Filter, Lock, Search, Store } from "lucide-react";

const TABS = ["All", "Declutter", "Bundle", "Marketplace"];

const Marketplace = () => {
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const items = DEMO_PRODUCTS.filter((p) => (tab === "All" || p.category === tab) && p.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell title="Marketplace">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">Buy from corpers, sell before POP</div>
          <h1 className="font-display text-3xl font-semibold mt-1">Marketplace & Declutter</h1>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 lg:w-72">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} className="h-11 pl-9 rounded-pill" placeholder="Search items…" />
          </div>
          <Button variant="default"><Store className="h-4 w-4" /> List item</Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-pill px-4 py-1.5 text-xs font-semibold border transition-colors ${tab === t ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border hover:bg-surface-alt"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {items.map((p) => (
          <article key={p.id} className="rounded-2xl bg-surface border border-border overflow-hidden kw-card-hover">
            <div className="aspect-[4/3] bg-surface-alt flex items-center justify-center text-6xl">{p.img}</div>
            <div className="p-4">
              <div className="text-sm font-semibold line-clamp-1">{p.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{p.seller} · {p.state}</div>
              <div className="flex items-center justify-between mt-3">
                <div className="font-display text-lg font-semibold tabular">{formatNaira(p.price)}</div>
                <Button size="sm" variant="soft"><Lock className="h-3 w-3" /> Buy</Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-3xl bg-primary text-primary-foreground p-6 lg:p-8 flex flex-col lg:flex-row gap-5 items-start lg:items-center">
        <Lock className="h-8 w-8 text-accent" />
        <div className="flex-1">
          <div className="font-display text-xl font-semibold">Every purchase is held in Safetrade.</div>
          <div className="text-primary-foreground/70 text-sm mt-1">Your money is released to the seller only after you confirm delivery.</div>
        </div>
        <Button variant="hero">Learn more</Button>
      </div>
    </AppShell>
  );
};

export default Marketplace;
