import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_TICKETS, DEMO_WELFARE_HISTORY } from "@/lib/demo-data";
import { WelfareSheet } from "@/components/sheets/WelfareSheet";
import { WelfarePackageSheet } from "@/components/sheets/WelfarePackageSheet";
import { HeartHandshake, MessageSquare, Plus, ShieldCheck, Gift, Clock, ChevronRight, Info, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatNaira } from "@/lib/format";

const STATUS_COLORS: Record<string, string> = {
  open: "bg-warning/20 text-warning-foreground",
  in_review: "bg-primary/10 text-primary",
  resolved: "bg-success/15 text-success",
};

const Welfare = () => {
  const [open, setOpen] = useState(false);
  const [packageOpen, setPackageOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"tickets" | "packages">("tickets");

  return (
    <AppShell title="Welfare">
      <WelfareSheet open={open} onOpenChange={setOpen} />
      <WelfarePackageSheet open={packageOpen} onOpenChange={setPackageOpen} />

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground cursor-help">Direct line to NYSC officials</div>
                <h1 className="font-display text-3xl font-semibold mt-1 cursor-help flex items-center gap-2">Welfare & Support <Info className="h-4 w-4 opacity-50" /></h1>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Official support channel for issues, requests, and welfare packages.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPackageOpen(true)}><Gift className="h-4 w-4" /> Request Package</Button>
          <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Raise a ticket</Button>
        </div>
      </div>

      <div className="flex gap-2 mt-8 border-b border-border">
        <button 
          onClick={() => setActiveTab("tickets")}
          className={`pb-3 px-2 text-sm font-semibold transition-all relative ${activeTab === "tickets" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          Support Tickets
          {activeTab === "tickets" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveTab("packages")}
          className={`pb-3 px-2 text-sm font-semibold transition-all relative ${activeTab === "packages" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          Welfare Packages
          {activeTab === "packages" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />}
        </button>
      </div>

      <div className="rounded-3xl bg-primary text-primary-foreground p-6 mt-6 flex flex-col lg:flex-row gap-5 items-start lg:items-center">
        <HeartHandshake className="h-8 w-8 text-accent" />
        <div className="flex-1">
          <div className="font-display text-xl font-semibold">Average response: under 48 hours</div>
          <div className="text-primary-foreground/70 text-sm mt-1">Tickets are routed to the right zonal inspector or finance officer based on category.</div>
        </div>
        <ShieldCheck className="hidden lg:block h-6 w-6 text-accent" />
      </div>

      {activeTab === "tickets" ? (
        <div className="mt-8">
          <h2 className="font-display text-xl font-semibold">Your tickets</h2>
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
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-surface border border-border p-6 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-success/10 text-success flex items-center justify-center mb-4">
                  <Gift className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold">Available Packages</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Apply for medical assistance, food provisions, or transport subsidies from the National Welfare Fund.
                </p>
              </div>
              <Button className="mt-6 w-full" onClick={() => setPackageOpen(true)}>Start New Request</Button>
            </div>
            
            <div className="rounded-3xl bg-surface border border-border p-6 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold">Request History</h3>
                <div className="mt-4 space-y-3">
                  {DEMO_WELFARE_HISTORY.map((h) => (
                    <div key={h.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-alt border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          h.status === "approved" ? "bg-success/10 text-success" : 
                          h.status === "pending" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                        }`}>
                          {h.status === "approved" ? <CheckCircle2 className="h-4 w-4" /> : 
                           h.status === "pending" ? <AlertCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{h.type}</div>
                          <div className="text-[10px] text-muted-foreground">{h.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        {h.amount && <div className="text-sm font-bold tabular">{formatNaira(h.amount)}</div>}
                        <div className={`text-[9px] font-bold uppercase tracking-wider ${
                          h.status === "approved" ? "text-success" : 
                          h.status === "pending" ? "text-warning" : "text-destructive"
                        }`}>{h.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <section className="rounded-3xl bg-surface-alt border border-border p-8">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold">How it works</h2>
              <ul className="mt-6 space-y-4">
                <li className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">1</div>
                  <p className="text-sm">Submit your request with a clear reason and any supporting evidence if needed.</p>
                </li>
                <li className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">2</div>
                  <p className="text-sm">The Zonal Welfare Committee reviews your application within 5-7 working days.</p>
                </li>
                <li className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">3</div>
                  <p className="text-sm">Once approved, funds or resources are disbursed directly to your Kopawe wallet or local PPA.</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </AppShell>
  );
};

export default Welfare;
