"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/shared/components/Logo";
import { Button } from "@/shared/ui/Button";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to send reset email");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-block mb-10">
            <Logo size="lg" />
          </Link>

          <div className="bg-ink-900 border border-honey-500/20 rounded-lg p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-honey-500/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-honey-500" />
            </div>

            <h1 className="text-h2 font-display font-bold text-ink-50 mb-4">
              Check Your Email
            </h1>

            <p className="text-body text-ink-400 mb-6">
              If an account exists with the email <span className="text-honey-500 font-medium">{email}</span>,
              we&apos;ve sent you password reset instructions.
            </p>

            <p className="text-body-sm text-ink-500 mb-8">
              Please check your inbox and spam folder. The link will expire in 1 hour.
            </p>

            <Link href="/login" className="btn-primary w-full inline-block">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-block mb-10">
          <Logo size="lg" />
        </Link>

        <div className="mb-8">
          <h1 className="text-h1 font-display font-bold text-ink-50 mb-2">
            Forgot Your Password?
          </h1>
          <p className="text-body-lg text-ink-400">
            No worries. Enter your email and we&apos;ll send you reset instructions.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-body text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="neo@matrix.com"
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading || !email}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/login" className="link inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}