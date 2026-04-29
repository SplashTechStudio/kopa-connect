import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { DEMO_JOBS } from "@/lib/demo-data";
import { Briefcase, MapPin, DollarSign, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { JobDetailSheet } from "@/components/sheets/JobDetailSheet";

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openJob = (job: any) => {
    setSelectedJob(job);
    setSheetOpen(true);
  };
  return (
    <AppShell title="Job Board">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted-foreground">Post-NYSC & Internship opportunities</div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h1 className="font-display text-3xl font-semibold mt-1 cursor-help">Job Board</h1>
              </TooltipTrigger>
              <TooltipContent>
                <p>Find verified job openings and internships curated for NYSC members.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 lg:w-72">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-11 pl-9 rounded-pill" placeholder="Search roles, companies..." />
          </div>
          <Button variant="outline" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid gap-4 mt-8">
        {DEMO_JOBS.map((j) => (
          <div key={j.id} className="rounded-3xl bg-surface border border-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 kw-card-hover transition-all">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold">{j.title}</h3>
                <div className="text-sm text-muted-foreground mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {j.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {j.company}</span>
                  <span className="flex items-center gap-1.5 font-semibold text-foreground"><DollarSign className="h-3.5 w-3.5" /> {j.pay}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {j.type}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                    Verified
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="soft" onClick={() => openJob(j)}>View Details</Button>
              <Button onClick={() => openJob(j)}>Apply Now</Button>
            </div>
          </div>
        ))}
      </div>

      <JobDetailSheet open={sheetOpen} onOpenChange={setSheetOpen} job={selectedJob} />

      <div className="mt-8 rounded-3xl bg-primary text-primary-foreground p-8 flex flex-col lg:flex-row gap-6 items-center text-center lg:text-left">
        <div className="h-16 w-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0">
          <Briefcase className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h2 className="font-display text-2xl font-semibold">Post a Job</h2>
          <p className="text-primary-foreground/70 mt-1">Are you an employer looking to hire the best NYSC talent? Post your openings here.</p>
        </div>
        <Button variant="hero" size="lg">Employer Portal</Button>
      </div>
    </AppShell>
  );
};

export default Jobs;
