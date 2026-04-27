import { ReactNode } from "react";
import {
  Home, Wallet, Store, Building2, MessageCircleMore,
  GraduationCap, ShieldCheck, Menu, Bell, Search, LogOut, ChevronRight, ShoppingBag,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useMember } from "@/context/MemberContext";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/app", label: "Home", icon: Home, end: true },
  { to: "/app/finance", label: "Finance", icon: Wallet },
  { to: "/app/marketplace", label: "Marketplace", icon: Store },
  { to: "/app/accommodation", label: "Accommodation", icon: Building2 },
  { to: "/app/community", label: "Community", icon: MessageCircleMore },
  { to: "/app/academy", label: "Academy", icon: GraduationCap },
];

const BOTTOM_NAV = [
  { to: "/app", label: "Home", icon: Home, end: true },
  { to: "/app/community", label: "Feed", icon: MessageCircleMore },
  { to: "/app/marketplace", label: "Market", icon: Store },
  { to: "/app/finance", label: "Wallet", icon: Wallet },
];

const Sidebar = () => {
  const { member, signOut } = useMember();
  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="px-6 py-6">
        <Logo variant="light" />
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className="group flex items-center gap-3 rounded-pill px-4 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            activeClassName="!bg-accent !text-accent-foreground shadow-sm"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}

        {member?.isAdmin && (
          <>
            <div className="pt-5 pb-1 px-4 text-[10px] uppercase tracking-[0.12em] text-sidebar-foreground/50">
              NYSC Admin
            </div>
            <NavLink
              to="/app/admin"
              className="flex items-center gap-3 rounded-pill px-4 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              activeClassName="!bg-accent !text-accent-foreground shadow-sm"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin Console</span>
            </NavLink>
          </>
        )}
      </nav>

      <div className="m-3 rounded-2xl bg-sidebar-accent/40 p-4 border border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent text-accent-foreground font-display text-sm font-bold flex items-center justify-center">
            {member?.fullName.split(" ").map(p => p[0]).slice(0, 2).join("")}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold truncate">{member?.fullName}</div>
            <div className="text-[11px] text-sidebar-foreground/60 truncate">{member?.stateCode}</div>
          </div>
          <button
            onClick={signOut}
            className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

const MobileSidebar = () => {
  const { member } = useMember();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-sidebar text-sidebar-foreground border-sidebar-border p-0">
        <div className="px-6 py-6">
          <Logo variant="light" />
        </div>
        <nav className="px-3 space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className="flex items-center gap-3 rounded-pill px-4 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeClassName="!bg-accent !text-accent-foreground"
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
          {member?.isAdmin && (
            <NavLink
              to="/app/admin"
              className="flex items-center gap-3 rounded-pill px-4 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeClassName="!bg-accent !text-accent-foreground"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin Console
            </NavLink>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const TopBar = ({ title }: { title?: string }) => {
  const { member } = useMember();
  const { count } = useCart();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 backdrop-blur-md px-4 lg:px-8">
      <MobileSidebar />
      <div className="lg:hidden">
        <Logo />
      </div>
      <div className="hidden lg:flex flex-1 items-center gap-2">
        {title && <h1 className="font-display text-xl font-semibold">{title}</h1>}
      </div>
      <div className="flex flex-1 lg:flex-none items-center justify-end gap-2">
        <button
          onClick={() => navigate("/app/community")}
          className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-pill border border-border bg-surface text-sm text-muted-foreground hover:bg-surface-alt transition-colors"
        >
          <Search className="h-4 w-4" />
          <span>Search Kopa We…</span>
          <kbd className="ml-2 hidden md:inline-flex h-5 items-center rounded border border-border bg-background px-1.5 text-[10px] font-medium text-muted-foreground">⌘K</kbd>
        </button>
        <Button variant="ghost" size="icon" className="relative" onClick={() => navigate("/app/cart")} aria-label="Cart">
          <ShoppingBag className="h-4 w-4" />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-pill bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center tabular ring-2 ring-background">
              {count}
            </span>
          )}
        </Button>
        <Button variant="ghost" size="icon" className="relative" onClick={() => navigate("/app/notifications")} aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
        </Button>
        <button
          onClick={() => navigate("/app/profile")}
          className="flex items-center gap-2 rounded-pill border border-border bg-surface px-1.5 py-1 hover:bg-surface-alt transition-colors"
        >
          <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-display text-xs font-bold flex items-center justify-center">
            {member?.fullName.split(" ").map(p => p[0]).slice(0, 2).join("")}
          </span>
          <ChevronRight className="hidden md:block h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};

const BottomNav = () => (
  <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-40 rounded-pill bg-primary text-primary-foreground shadow-lg">
    <div className="grid grid-cols-4">
      {BOTTOM_NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className="flex flex-col items-center gap-1 py-3 text-[10px] font-semibold text-primary-foreground/60 transition-colors"
          activeClassName="!text-accent"
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  </nav>
);

export const AppShell = ({ children, title }: { children: ReactNode; title?: string }) => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={title} />
        <main className="flex-1 px-4 lg:px-8 py-6 lg:py-8 pb-28 lg:pb-10">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
};
