"use client";

import { cn } from "@/shared/utils/cn";

interface AppLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const sizes = {
  sm: 40,
  md: 64,
  lg: 96,
};

export function AppLoader({ 
  size = "md", 
  text, 
  fullScreen = false,
  className 
}: AppLoaderProps) {
  const iconSize = sizes[size];

  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <AnimatedLogo size={iconSize} />
      {text && (
        <p className="text-body-sm text-ink-400 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-ink-950 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-grid opacity-5" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-honey-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-honey-500/3 rounded-full blur-3xl" />
        <div className="relative z-10">{content}</div>
      </div>
    );
  }

  return content;
}

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

export function AnimatedLogo({ size = 64, className }: AnimatedLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("animate-logo-spin", className)}
    >
      <defs>
        <filter id="loader-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="loaderHoneyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Table - outer ring with animation */}
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke="url(#loaderHoneyGradient)"
        strokeWidth="2.5"
        fill="none"
        filter="url(#loader-glow)"
        className="origin-center"
        strokeDasharray="150.8"
        strokeDashoffset="0"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;150.8"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Inner static ring */}
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke="#44403C"
        strokeWidth="2.5"
        fill="none"
        opacity="0.3"
      />

      {/* Table - inner surface */}
      <circle cx="32" cy="32" r="16" fill="#292524" stroke="#44403C" strokeWidth="1" />

      {/* Pulsing center */}
      <circle cx="32" cy="32" r="4" fill="url(#loaderHoneyGradient)">
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="3;5;3"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Rotating chairs */}
      <g className="origin-center animate-spin" style={{ animationDuration: '3s' }}>
        {/* Chair 1 */}
        <g transform="translate(32, 6)">
          <rect x="-4" y="0" width="8" height="6" rx="1.5" fill="url(#loaderHoneyGradient)" />
        </g>
        {/* Chair 2 */}
        <g transform="translate(32, 32) rotate(120) translate(0, -26)">
          <rect x="-4" y="0" width="8" height="6" rx="1.5" fill="url(#loaderHoneyGradient)" />
        </g>
        {/* Chair 3 */}
        <g transform="translate(32, 32) rotate(240) translate(0, -26)">
          <rect x="-4" y="0" width="8" height="6" rx="1.5" fill="url(#loaderHoneyGradient)" />
        </g>
      </g>
    </svg>
  );
}

export default AppLoader;
