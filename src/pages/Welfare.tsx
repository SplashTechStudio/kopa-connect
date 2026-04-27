import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_TICKETS } from "@/lib/demo-data";
import { WelfareSheet } from "@/components/sheets/WelfareSheet";
import { HeartHandshake, MessageSquare, Plus, ShieldCheck } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  open: "bg-warning/20 text-warning-foreground",
  in_review: "bg-primary/10 text-primary",
  resolved: "bg-success/15 text-success",
};

const Welfare = () => {
  const [open, setOpen] = useState(false);

  return (
    <AppShell title="Welfare">
      <WelfareSheet open={open} onOpenChange={setOpen} />

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">Direct line to NYSC officials</div>
          <h1 className="font-display text-3xl font-semibold mt-1">Welfare tickets</h1>
        </div>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Raise a ticket</Button>
      </div>

      <div className="rounded-3xl bg-primary text-primary-foreground p-6 mt-6 flex flex-col lg:flex-row gap-5 items-start lg:items-center">
        <HeartHandshake className="h-8 w-8 text-accent" />
        <div className="flex-1">
          <div className="font-display text-xl font-semibold">Average response: under 48 hours</div>
          <div className="text-primary-foreground/70 text-sm mt-1">Tickets are routed to the right zonal inspector or finance officer based on category.</div>
        </div>
        <ShieldCheck className="hidden lg:block h-6 w-6 text-accent" />
      </div>

      <h2 className="font-display text-xl font-semibold mt-8">Your tickets</h2>
      <div className="space-y-3 mt-3">
        {DEMO_TICKETS.map((t) => (
          <article key={t.id} className="rounded-2xl bg-surface border border-border p-5">
            <div className="flex items-start gap-3">
              <MessageSquare className="h-4 w-4 text-primary mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold">{t.title}</div>
                  <span className={`text-[10px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-pill ${STATUS_COLORS[t.status]}`}>
                    {t.status.replace("_", " ")}
                  </span>
                  <span className="ml-auto text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{t.category} · {t.time}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-2">{t.body}</div>
                {t.assigned && <div className="text-xs text-muted-foreground mt-2">Assigned to <span className="font-semibold text-foreground">{t.assigned}</span></div>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
};

export default Welfare;
