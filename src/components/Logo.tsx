import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showWord?: boolean;
}

export const Logo = ({ className, variant = "dark", showWord = true }: LogoProps) => {
  const wordColor = variant === "light" ? "text-white" : "text-primary";
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary shadow-sm">
        <span className="absolute inset-1 rounded-sm bg-accent" />
        <span className="relative font-display text-sm font-bold text-primary">K</span>
      </span>
      {showWord && (
        <span className={cn("font-display text-lg font-semibold tracking-tight", wordColor)}>
          kopa<span className="text-accent">·</span>we
        </span>
      )}
    </div>
  );
};
