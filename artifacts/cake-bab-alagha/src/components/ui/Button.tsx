import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 active:bg-primary/95 border-b-4 border-primary/40 active:border-b-0 active:translate-y-[4px]",
      secondary: "bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90 active:bg-secondary/95 border-b-4 border-secondary/40 active:border-b-0 active:translate-y-[4px]",
      outline: "border-2 border-primary text-primary hover:bg-primary/5 active:bg-primary/10",
      ghost: "text-primary hover:bg-primary/5 active:bg-primary/10",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-lg",
      md: "h-12 px-6 text-base font-semibold rounded-xl",
      lg: "h-14 px-8 text-lg font-bold rounded-xl",
      icon: "h-12 w-12 flex items-center justify-center rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
