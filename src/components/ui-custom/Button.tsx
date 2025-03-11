
import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", iconLeft, iconRight, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
          {
            "bg-primary text-primary-foreground hover:opacity-90 active:opacity-80 shadow-sm": variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70": variant === "secondary",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "h-10 px-4 py-2": size === "default",
            "h-9 px-3 text-sm": size === "sm",
            "h-11 px-6 text-lg": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {iconLeft && <span>{iconLeft}</span>}
          {children}
          {iconRight && <span>{iconRight}</span>}
        </span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
