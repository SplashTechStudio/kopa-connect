import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Users, ShieldCheck, BadgeCheck, Loader2, Info, ChevronRight, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { formatNaira } from "@/lib/format";

interface SavingsGroup {
  id: string;
  title: string;
  groupName: string;
  membersCount: number;
  balance: number;
  interestRate: string;
  nextPayout: string;
  rules?: string;
}

export const SavingsGroupDetailSheet = ({ open, onOpenChange, group }: { open: boolean; onOpenChange: (v: boolean) => void; group: SavingsGroup | null }) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!group) return null;

  const handleJoin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setDone(true);
    toast.success(`Welcome to ${group.groupName}!`);
    setTimeout(() => {
      onOpenChange(false);
      setDone(false);
    }, 2000);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[90vh] overflow-y-auto">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <SheetTitle className="font-display text-2xl">{group.title}</SheetTitle>
                  <p className="text-sm text-muted-foreground">Hosted by {group.groupName}</p>
                </div>
              </div>
            </SheetHeader>

            <div className="mt-6 max-w-3xl mx-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-surface-alt border border-border">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Members</div>
                  <div className="text-xl font-bold">{group.membersCount} Corpers</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-alt border border-border">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Interest Rate</div>
                  <div className="text-xl font-bold">{group.interestRate}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Info className="h-4 w-4" /> Group Rules
                </h4>
                <div className="p-5 rounded-2xl bg-surface-alt border border-border whitespace-pre-wrap text-sm leading-relaxed">
                  {group.rules || "No specific rules listed for this group."}
                </div>
              </div>

              <div className="rounded-2xl bg-primary/5 p-5 flex items-start gap-4">
                <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <div className="font-semibold text-sm">Verified & Protected</div>
                  <p className="text-xs text-muted-foreground mt-1">This group is verified by Kopawe. All contributions are automatically managed by our secure escrow system.</p>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button onClick={handleJoin} className="flex-1 h-12 text-base" disabled={loading}>
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Joining...</> : <><UserPlus className="h-4 w-4 mr-2" /> Join This Group</>}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-20 text-center animate-snap-in">
            <div className="h-20 w-20 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto mb-6">
              <BadgeCheck className="h-10 w-10" />
            </div>
            <h2 className="font-display text-3xl font-bold">Successfully Joined!</h2>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
              You are now a member of <span className="font-semibold text-foreground">{group.groupName}</span>. Your first contribution will be scheduled for <span className="font-semibold text-foreground">next month</span>.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
