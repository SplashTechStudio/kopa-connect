import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showWord?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Logo = ({ className, variant = "dark", showWord = true, size = "md" }: LogoProps) => {
  // Use icon for small/collapsed states, logo for full display
  const src = showWord ? "/logo-white.png" : "/icon.png";
  
  const sizeClasses = {
    sm: "h-6",
    md: "h-10",
    lg: "h-14",
    xl: "h-20"
  };
  
  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <img 
        src={src} 
        alt="CorperOne" 
        className={cn(
          "object-contain transition-all duration-300",
          sizeClasses[size],
          !showWord && "aspect-square"
        )} 
      />
    </div>
  );
};
