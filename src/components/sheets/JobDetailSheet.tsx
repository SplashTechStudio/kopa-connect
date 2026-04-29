import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin, DollarSign, BadgeCheck, Loader2, Upload, Send } from "lucide-react";
import { toast } from "sonner";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  pay: string;
  description: string;
  requirements: string[];
}

export const JobDetailSheet = ({ open, onOpenChange, job }: { open: boolean; onOpenChange: (v: boolean) => void; job: Job | null }) => {
  const [step, setStep] = useState<"details" | "apply">("details");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!job) return null;

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setDone(true);
    toast.success("Application submitted successfully!");
    setTimeout(() => {
      onOpenChange(false);
      setStep("details");
      setDone(false);
    }, 2000);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => { if(!v) setStep("details"); onOpenChange(v); }}>
      <SheetContent side="bottom" className="rounded-t-3xl border-t-0 max-h-[95vh] overflow-y-auto">
        {!done ? (
          <>
            <SheetHeader className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <SheetTitle className="font-display text-2xl">{job.title}</SheetTitle>
                  <p className="text-sm text-muted-foreground">{job.company} · {job.location}</p>
                </div>
              </div>
            </SheetHeader>

            <div className="mt-6 max-w-3xl mx-auto">
              {step === "details" ? (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1.5"><DollarSign className="h-4 w-4 text-primary" /> {job.pay}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> {job.type}</span>
                    <span className="flex items-center gap-1.5 text-success font-semibold"><BadgeCheck className="h-4 w-4" /> Verified Employer</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">Description</h4>
                    <p className="text-sm leading-relaxed text-pretty">{job.description}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">Requirements</h4>
                    <ul className="list-disc list-inside text-sm space-y-1.5">
                      {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border flex gap-3">
                    <Button onClick={() => setStep("apply")} className="flex-1 h-12 text-base">Apply Now</Button>
                    <Button variant="outline" className="h-12 px-6">Save Job</Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                      <Input placeholder="Adaeze Okonkwo" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                      <Input type="email" placeholder="adaeze@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">LinkedIn Profile (Optional)</label>
                    <Input placeholder="https://linkedin.com/in/..." />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cover Note</label>
                    <Textarea placeholder="Why are you a good fit for this role?" className="min-h-[100px]" required />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Resume/CV</label>
                    <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer bg-surface-alt">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-semibold">Click to upload or drag and drop</div>
                      <div className="text-xs text-muted-foreground mt-1">PDF, DOCX (Max 5MB)</div>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <Button type="button" variant="ghost" onClick={() => setStep("details")} disabled={loading}>Back</Button>
                    <Button type="submit" className="flex-1 h-12" disabled={loading}>
                      {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Submitting...</> : <><Send className="h-4 w-4 mr-2" /> Submit Application</>}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </>
        ) : (
          <div className="py-20 text-center animate-snap-in">
            <div className="h-20 w-20 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto mb-6">
              <BadgeCheck className="h-10 w-10" />
            </div>
            <h2 className="font-display text-3xl font-bold">Application Sent!</h2>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
              Your application for <span className="font-semibold text-foreground">{job.title}</span> at <span className="font-semibold text-foreground">{job.company}</span> has been received.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
