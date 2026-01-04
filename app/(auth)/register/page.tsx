"use client";

import Link from "next/link";
import { Logo, MootableIcon } from "@/shared/components/Logo";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { RedPill, WhiteRabbit, RabbitHole, PocketWatch } from "@/shared/components/ThematicIcons";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function RegisterPage() {
  const handleOAuthLogin = (provider: string) => {
    window.location.href = `${API_URL}/oauth2/login/${provider.toLowerCase()}`;
  };

  return (
    <div className="min-h-screen bg-ink-950 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-ink-900 items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-radial-honey opacity-50" />
        
        {/* Animated Rabbit Hole */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <RabbitHole size={500} className="animate-spiral" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-12">
          {/* White Rabbit */}
          <div className="mb-6">
            <WhiteRabbit size={80} className="mx-auto animate-hop" />
          </div>
          
          <div className="mb-6">
            <MootableIcon size={140} className="mx-auto animate-float" />
          </div>
          
          <h2 className="text-h2 font-display font-bold text-ink-50 mb-4">
            Begin Your Awakening
          </h2>
          <p className="text-body-lg text-ink-400 max-w-md mx-auto mb-2">
            &quot;The Matrix is a system, Neo. That system is our enemy.&quot;
          </p>
          <p className="text-body text-ink-500 max-w-md mx-auto mb-8 italic">
            But here? Here we build our own reality.
          </p>
          
          {/* Features List - Thematic */}
          <div className="text-left max-w-sm mx-auto space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-ink-800 border border-honey-500/50 flex items-center justify-center group-hover:bg-honey-500/20 transition-colors">
                <RedPill size={18} />
              </div>
              <div>
                <span className="text-body text-ink-200 block">Build Your Nebuchadnezzar</span>
                <span className="text-caption text-ink-500">Your ship, your rules</span>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-ink-800 border border-honey-500/50 flex items-center justify-center group-hover:bg-honey-500/20 transition-colors">
                <WhiteRabbit size={18} />
              </div>
              <div>
                <span className="text-body text-ink-200 block">Follow Every Rabbit</span>
                <span className="text-caption text-ink-500">No idea left unexplored</span>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-ink-800 border border-honey-500/50 flex items-center justify-center group-hover:bg-honey-500/20 transition-colors">
                <MootableIcon size={18} />
              </div>
              <div>
                <span className="text-body text-ink-200 block">Gather at the Table</span>
                <span className="text-caption text-ink-500">Every voice matters</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pocket Watch */}
        <div className="absolute top-16 right-16 animate-tick">
          <PocketWatch size={64} />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-honey-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-48 h-48 bg-honey-500/5 rounded-full blur-3xl" />
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto relative">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <Link href="/" className="inline-block mb-10">
            <Logo size="lg" />
          </Link>

          {/* Header */}
          <div className="mb-8">
            <p className="text-caption text-honey-500 italic mb-2">
              &quot;Free your mind.&quot;
            </p>
            <h1 className="text-h1 font-display font-bold text-ink-50 mb-2">
              Take the Red Pill
            </h1>
            <p className="text-body-lg text-ink-400">
              Your journey down the rabbit hole starts here.
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-8">
            <button 
              className="btn-social group"
              onClick={() => handleOAuthLogin("Google")}
            >
              <GoogleIcon />
              Sign up with Google
            </button>
            <button 
              className="btn-social group"
              onClick={() => handleOAuthLogin("Microsoft")}
            >
              <MicrosoftIcon />
              Sign up with Microsoft
            </button>
          </div>

          {/* Divider */}
          <div className="divider mb-8">or create your identity</div>

          {/* Register Form */}
          <RegisterForm />

          {/* Terms */}
          <p className="text-caption text-ink-500 text-center mt-6">
            By joining, you accept our{" "}
            <Link href="/terms" className="text-honey-500 hover:underline">Terms</Link>
            {" "}&{" "}
            <Link href="/privacy" className="text-honey-500 hover:underline">Privacy Policy</Link>
          </p>

          {/* Sign In Link */}
          <p className="text-center text-ink-400 mt-8">
            Already awakened?{" "}
            <Link href="/login" className="link font-medium">
              Enter the Matrix
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#00A4EF" d="M1 13h10v10H1z" />
      <path fill="#7FBA00" d="M13 1h10v10H13z" />
      <path fill="#FFB900" d="M13 13h10v10H13z" />
    </svg>
  );
}
