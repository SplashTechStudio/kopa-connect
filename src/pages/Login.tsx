import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { Loader2, ArrowRight, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your credentials.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Welcome back!");
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center flex flex-col items-center">
          <Logo size="xl" className="mb-8" />
          <h2 className="mt-6 text-3xl font-display font-bold">Welcome back</h2>
          <p className="mt-2 text-sm text-muted-foreground">Log in to manage your NYSC service year.</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4 opacity-50" /> Email Address
              </label>
              <Input 
                type="email" 
                placeholder="adaeze@example.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Lock className="h-4 w-4 opacity-50" /> Password
              </label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" id="remember" />
              <label htmlFor="remember" className="text-muted-foreground">Remember me</label>
            </div>
            <Link to="#" className="font-semibold text-primary hover:underline">Forgot password?</Link>
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full h-12 rounded-xl font-bold">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Logging in...</> : <>Log in <ArrowRight className="ml-2 h-4 w-4" /></>}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-primary hover:underline">Create one for free</Link>
        </p>
      </div>
    </div>
  );
}
