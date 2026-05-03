import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Calendar, ShieldCheck, Clock, Plus, Sparkles, ArrowRight } from "lucide-react";
import { BookCounsellingSheet } from "@/components/sheets/BookCounsellingSheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Counselling = () => {
  const [open, setOpen] = useState(false);

  return (
    <AppShell title="Counselling">
      <BookCounsellingSheet open={open} onOpenChange={setOpen} />

      <div className="rounded-3xl bg-primary text-primary-foreground p-7 lg:p-10 relative overflow-hidden kw-noise">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]">
            <Heart className="h-3 w-3 text-accent" /> CorperOne Wellness
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mt-4 text-balance">Safe space for every corper.</h1>
          <p className="text-primary-foreground/70 mt-3">Professional counselling for mental health, career guidance, and relationships. 100% confidential and free for active corpers.</p>
          <Button className="mt-6 bg-white text-primary hover:bg-white/90" onClick={() => setOpen(true)}>Book a Free Session</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 mt-8">
        <section className="lg:col-span-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureCard 
              icon={Heart} 
              title="Mental Health" 
              desc="Talk to licensed therapists about anxiety, stress, or homesickness." 
              color="bg-red-50 text-red-600"
            />
            <FeatureCard 
              icon={Sparkles} 
              title="Career Guidance" 
              desc="Plan your post-NYSC path with experienced career strategists." 
              color="bg-blue-50 text-blue-600"
            />
            <FeatureCard 
              icon={MessageCircle} 
              title="Relationships" 
              desc="Navigate social and professional relationships during your service year." 
              color="bg-purple-50 text-purple-600"
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="100% Confidential" 
              desc="Your identity and discussions never leave the room. Safe and secure." 
              color="bg-green-50 text-green-600"
            />
          </div>

          <div className="rounded-3xl bg-surface border border-border p-6">
            <h2 className="font-display text-xl font-semibold flex items-center gap-2 mb-4">Upcoming Sessions</h2>
            <div className="bg-surface-alt rounded-2xl p-8 text-center">
              <div className="h-12 w-12 rounded-full bg-border flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="text-sm font-semibold">No active sessions</div>
              <p className="text-xs text-muted-foreground mt-1">Book your first session to see it here.</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setOpen(true)}>Schedule Now</Button>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-surface border border-border p-6">
            <h2 className="font-display text-lg font-semibold mb-4">Emergency Support</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                <div className="font-semibold text-red-700 text-sm">Crisis Hotline</div>
                <div className="text-xs text-red-600 mt-1">Available 24/7 for urgent mental health support.</div>
                <Button className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white border-none">Call: 0800-CORPER-HELP</Button>
              </div>
              
              <div className="p-4 rounded-2xl bg-surface-alt border border-border">
                <div className="font-semibold text-sm">Peer Support Groups</div>
                <div className="text-xs text-muted-foreground mt-1">Join weekly moderated group chats with fellow corpers.</div>
                <Button variant="ghost" className="w-full mt-2 text-xs h-8">Browse Groups <ArrowRight className="h-3 w-3 ml-1" /></Button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-primary text-primary-foreground p-6">
            <h2 className="font-display text-lg font-semibold mb-2">Did you know?</h2>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              70% of corpers feel overwhelmed in their first 3 months. You are not alone, and help is just a click away.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color }: { icon: any; title: string; desc: string; color: string }) => (
  <div className="p-5 rounded-3xl bg-surface border border-border hover:border-primary transition-all group">
    <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
      <Icon className="h-5 w-5" />
    </div>
    <div className="font-semibold">{title}</div>
    <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</div>
  </div>
);

export default Counselling;
