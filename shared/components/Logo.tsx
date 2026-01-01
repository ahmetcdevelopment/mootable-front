"use client";

import { cn } from "@/shared/utils/cn";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 32, text: "text-lg" },
  md: { icon: 40, text: "text-xl" },
  lg: { icon: 56, text: "text-2xl" },
  xl: { icon: 72, text: "text-3xl" },
};

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const { icon, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <MootableIcon size={icon} />
      {showText && (
        <span className={cn("font-display font-semibold text-ink-50", text)}>
          mootable
        </span>
      )}
    </div>
  );
}

interface MootableIconProps {
  size?: number;
  className?: string;
}

export function MootableIcon({ size = 40, className }: MootableIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer glow effect */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="honeyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Table - outer ring */}
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke="url(#honeyGradient)"
        strokeWidth="2.5"
        fill="none"
        filter="url(#glow)"
      />

      {/* Table - inner surface */}
      <circle cx="32" cy="32" r="16" fill="#292524" stroke="#44403C" strokeWidth="1" />

      {/* Table center accent */}
      <circle cx="32" cy="32" r="4" fill="url(#honeyGradient)" opacity="0.6" />

      {/* Chair 1 - Top (12 o'clock position) */}
      <g transform="translate(32, 6)">
        <rect
          x="-5"
          y="0"
          width="10"
          height="8"
          rx="2"
          fill="url(#honeyGradient)"
        />
        <rect x="-4" y="8" width="8" height="3" rx="1" fill="#B45309" />
      </g>

      {/* Chair 2 - Bottom Left (8 o'clock position) */}
      <g transform="translate(10, 45) rotate(-120, 0, 0)">
        <rect
          x="-5"
          y="0"
          width="10"
          height="8"
          rx="2"
          fill="url(#honeyGradient)"
        />
        <rect x="-4" y="8" width="8" height="3" rx="1" fill="#B45309" />
      </g>

      {/* Chair 3 - Bottom Right (4 o'clock position) */}
      <g transform="translate(54, 45) rotate(120, 0, 0)">
        <rect
          x="-5"
          y="0"
          width="10"
          height="8"
          rx="2"
          fill="url(#honeyGradient)"
        />
        <rect x="-4" y="8" width="8" height="3" rx="1" fill="#B45309" />
      </g>
    </svg>
  );
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <MootableIcon size={80} />
      <span className="font-display text-3xl font-semibold text-ink-50">
        mootable
      </span>
      <span className="text-caption text-ink-400 uppercase tracking-widest">
        Where Ideas Take Flight
      </span>
    </div>
  );
}
