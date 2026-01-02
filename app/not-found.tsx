"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-moot-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-moot-primary text-glow mb-4">404</h1>
        
        <h2 className="text-2xl font-bold text-moot-text mb-2">
          Lost in the Matrix
        </h2>
        <p className="text-moot-textMuted mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist. Perhaps you took the wrong pill?
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button 
            onClick={() => history.back()} 
            className="btn-secondary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
