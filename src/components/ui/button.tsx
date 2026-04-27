import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold ring-offset-background transition-all duration-200 ease-magnetic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm hover:shadow-md",
        volt: "bg-accent text-accent-foreground hover:brightness-105 shadow-volt",
        hero: "bg-gradient-volt text-accent-foreground shadow-volt hover:shadow-lg",
        outline: "border border-border bg-surface hover:bg-surface-alt text-foreground",
        ghost: "hover:bg-surface-alt text-foreground",
        soft: "bg-surface-alt text-primary hover:bg-secondary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-sm",
      },
      size: {
        default: "h-11 px-5 rounded-pill text-sm",
        sm: "h-9 px-4 rounded-pill text-xs",
        lg: "h-14 px-8 rounded-pill text-base",
        xl: "h-16 px-10 rounded-pill text-lg",
        icon: "h-11 w-11 rounded-pill",
        "icon-sm": "h-9 w-9 rounded-pill",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
