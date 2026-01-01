"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas/register.schema";
import { useRegister } from "../hooks/useRegister";
import { Loader2, Eye, EyeOff, Check, X } from "lucide-react";
import { useState, useMemo } from "react";

export function RegisterForm() {
  const { mutate: registerUser, isPending, error } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");
  
  const passwordStrength = useMemo(() => {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    };
    const score = Object.values(checks).filter(Boolean).length;
    return { checks, score };
  }, [password]);

  const onSubmit = (data: RegisterFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data;
    registerUser(registerData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name Fields Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="username" className="input-label">
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            className="input-field"
            placeholder="johndoe"
            disabled={isPending}
            autoComplete="username"
          />
          {errors.username && (
            <p className="mt-2 text-body-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="displayName" className="input-label">
            Display name <span className="text-ink-500">(optional)</span>
          </label>
          <input
            {...register("displayName")}
            type="text"
            id="displayName"
            className="input-field"
            placeholder="John Doe"
            disabled={isPending}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="input-label">
          Email address
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="input-field"
          placeholder="you@example.com"
          disabled={isPending}
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-2 text-body-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            id="password"
            className="input-field pr-12"
            placeholder="Create a strong password"
            disabled={isPending}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {password && (
          <div className="mt-3 space-y-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    passwordStrength.score >= level
                      ? passwordStrength.score <= 2
                        ? "bg-red-500"
                        : passwordStrength.score === 3
                        ? "bg-yellow-500"
                        : "bg-green-500"
                      : "bg-ink-700"
                  }`}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 text-caption">
              <PasswordCheck checked={passwordStrength.checks.length} label="8+ characters" />
              <PasswordCheck checked={passwordStrength.checks.lowercase} label="Lowercase" />
              <PasswordCheck checked={passwordStrength.checks.uppercase} label="Uppercase" />
              <PasswordCheck checked={passwordStrength.checks.number} label="Number" />
            </div>
          </div>
        )}
        
        {errors.password && (
          <p className="mt-2 text-body-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="input-label">
          Confirm password
        </label>
        <div className="relative">
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className="input-field pr-12"
            placeholder="Confirm your password"
            disabled={isPending}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-2 text-body-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-body-sm text-red-400">
            {(error as Error).message || "Registration failed. Please try again."}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
}

function PasswordCheck({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${checked ? "text-green-500" : "text-ink-500"}`}>
      {checked ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      <span>{label}</span>
    </div>
  );
}
