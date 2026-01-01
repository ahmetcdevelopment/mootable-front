"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-moot-background disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-moot-primary text-moot-background hover:bg-moot-accent focus:ring-moot-primary",
      secondary: "bg-moot-surface text-moot-text border border-moot-surfaceLight hover:bg-moot-surfaceLight focus:ring-moot-surfaceLight",
      ghost: "text-moot-text hover:bg-moot-surface focus:ring-moot-surfaceLight",
      danger: "bg-moot-error text-white hover:bg-moot-error/90 focus:ring-moot-error",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
