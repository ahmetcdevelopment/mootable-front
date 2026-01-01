"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function LoginForm() {
  const { mutate: login, isPending, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="input-label !mb-0">
            Password
          </label>
          <Link href="/forgot-password" className="text-body-sm text-honey-500 hover:text-honey-400 transition-colors">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            id="password"
            className="input-field pr-12"
            placeholder="Enter your password"
            disabled={isPending}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-2 text-body-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="remember"
          className="w-4 h-4 rounded border-ink-700 bg-ink-900 text-honey-500 focus:ring-honey-500/20"
        />
        <label htmlFor="remember" className="text-body-sm text-ink-400">
          Keep me signed in
        </label>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-body-sm text-red-400">
            {(error as Error).message || "Invalid email or password. Please try again."}
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
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}
