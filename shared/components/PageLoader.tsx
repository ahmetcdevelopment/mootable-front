"use client";

import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-moot-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-moot-primary" />
        <p className="text-moot-textMuted text-sm">Loading...</p>
      </div>
    </div>
  );
}
