"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-moot-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-moot-error/10 mx-auto mb-6 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-moot-error" />
        </div>
        
        <h1 className="text-2xl font-bold text-moot-text mb-2">
          Something went wrong
        </h1>
        <p className="text-moot-textMuted mb-6 max-w-md">
          A glitch in the Matrix. The machines are working on it.
        </p>
        
        <button
          onClick={reset}
          className="btn-primary inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
