import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary-light)] shadow-sm": variant === "default",
            "bg-[var(--color-brand-accent)] text-white hover:bg-[var(--color-brand-accent-light)] shadow-sm": variant === "accent",
            "border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-surface-hover)]": variant === "outline",
            "hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-brand-primary)]": variant === "ghost",
            "text-[var(--color-brand-primary)] underline-offset-4 hover:underline": variant === "link",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-12 rounded-md px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
