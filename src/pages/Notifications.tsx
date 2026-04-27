import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_NOTIFICATIONS, DemoNotification } from "@/lib/demo-data";
import { Bell, CheckCheck, MessageCircleMore, ShieldCheck, ShoppingBag, Wallet } from "lucide-react";

const ICONS: Record<DemoNotification["type"], typeof Bell> = {
  official: ShieldCheck,
  finance: Wallet,
  marketplace: ShoppingBag,
  community: MessageCircleMore,
};

const Notifications = () => {
  const [items, setItems] = useState<DemoNotification[]>(DEMO_NOTIFICATIONS);
  const markAll = () => setItems((curr) => curr.map((n) => ({ ...n, read: true })));
  const unread = items.filter((n) => !n.read).length;

  return (
    <AppShell title="Notifications">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">Inbox</div>
          <h1 className="font-display text-3xl font-semibold mt-1">{unread} unread</h1>
        </div>
        <Button variant="soft" onClick={markAll} disabled={unread === 0}><CheckCheck className="h-4 w-4" /> Mark all read</Button>
      </div>

      <div className="rounded-3xl bg-surface border border-border divide-y divide-border overflow-hidden">
        {items.map((n) => {
          const Icon = ICONS[n.type];
          return (
            <button key={n.id} className={`w-full flex items-start gap-4 p-5 text-left hover:bg-surface-alt transition-colors ${!n.read ? "bg-surface-alt/50" : ""}`}>
              <span className={`h-10 w-10 shrink-0 rounded-pill flex items-center justify-center ${n.type === "official" ? "bg-primary text-primary-foreground" : "bg-surface-alt text-primary"}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{n.title}</div>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-accent" />}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">{n.body}</div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground mt-2">{n.type} · {n.time}</div>
              </div>
            </button>
          );
        })}
      </div>
    </AppShell>
  );
};

export default Notifications;
