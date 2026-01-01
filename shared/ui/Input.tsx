"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-moot-text mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "input-field",
            error && "border-moot-error focus:ring-moot-error",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-moot-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
