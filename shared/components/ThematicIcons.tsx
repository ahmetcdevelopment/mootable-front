"use client";

import { cn } from "@/shared/utils/cn";

interface IconProps {
  size?: number;
  className?: string;
}

export function WhiteRabbit({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-honey-500", className)}
    >
      {/* Rabbit silhouette - Alice in Wonderland style */}
      <defs>
        <linearGradient id="rabbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      
      {/* Left ear */}
      <ellipse cx="22" cy="12" rx="4" ry="10" fill="url(#rabbitGlow)" opacity="0.9" />
      <ellipse cx="22" cy="12" rx="2" ry="7" fill="#292524" />
      
      {/* Right ear */}
      <ellipse cx="36" cy="10" rx="4" ry="11" fill="url(#rabbitGlow)" opacity="0.9" />
      <ellipse cx="36" cy="10" rx="2" ry="8" fill="#292524" />
      
      {/* Head */}
      <circle cx="29" cy="28" r="12" fill="url(#rabbitGlow)" />
      
      {/* Eye */}
      <circle cx="33" cy="26" r="2" fill="#292524" />
      <circle cx="34" cy="25" r="0.5" fill="#FAFAF9" />
      
      {/* Nose */}
      <ellipse cx="38" cy="30" rx="2" ry="1.5" fill="#B45309" />
      
      {/* Body */}
      <ellipse cx="32" cy="48" rx="14" ry="12" fill="url(#rabbitGlow)" opacity="0.85" />
      
      {/* Pocket watch suggestion */}
      <circle cx="44" cy="42" r="6" fill="#292524" stroke="url(#rabbitGlow)" strokeWidth="1.5" />
      <line x1="44" y1="42" x2="44" y2="38" stroke="#FBBF24" strokeWidth="1" />
      <line x1="44" y1="42" x2="47" y2="44" stroke="#FBBF24" strokeWidth="1" />
    </svg>
  );
}

export function RedPill({ size = 32, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="redPillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <filter id="pillGlow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Pill capsule */}
      <rect x="8" y="4" width="16" height="24" rx="8" fill="url(#redPillGrad)" filter="url(#pillGlow)" />
      
      {/* Highlight */}
      <ellipse cx="12" cy="10" rx="2" ry="4" fill="white" opacity="0.3" />
      
      {/* Division line */}
      <line x1="8" y1="16" x2="24" y2="16" stroke="#B91C1C" strokeWidth="0.5" />
    </svg>
  );
}

export function BluePill({ size = 32, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bluePillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      
      {/* Pill capsule */}
      <rect x="8" y="4" width="16" height="24" rx="8" fill="url(#bluePillGrad)" />
      
      {/* Highlight */}
      <ellipse cx="12" cy="10" rx="2" ry="4" fill="white" opacity="0.3" />
      
      {/* Division line */}
      <line x1="8" y1="16" x2="24" y2="16" stroke="#1E40AF" strokeWidth="0.5" />
    </svg>
  );
}

export function RabbitHole({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="holeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0C0A09" />
          <stop offset="70%" stopColor="#1C1917" />
          <stop offset="100%" stopColor="#F59E0B" opacity="0.3" />
        </radialGradient>
      </defs>
      
      {/* Spiral effect */}
      <ellipse cx="32" cy="32" rx="28" ry="28" fill="url(#holeGrad)" />
      <ellipse cx="32" cy="32" rx="22" ry="22" stroke="#F59E0B" strokeWidth="0.5" opacity="0.5" fill="none" />
      <ellipse cx="32" cy="32" rx="16" ry="16" stroke="#F59E0B" strokeWidth="0.5" opacity="0.4" fill="none" />
      <ellipse cx="32" cy="32" rx="10" ry="10" stroke="#F59E0B" strokeWidth="0.5" opacity="0.3" fill="none" />
      <ellipse cx="32" cy="32" rx="5" ry="5" stroke="#F59E0B" strokeWidth="0.5" opacity="0.2" fill="none" />
      
      {/* Center glow */}
      <circle cx="32" cy="32" r="3" fill="#F59E0B" opacity="0.6" />
    </svg>
  );
}

export function MatrixRain({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="matrix-rain">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="matrix-column"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <span
                key={j}
                className="matrix-char"
                style={{ animationDelay: `${j * 0.1}s` }}
              >
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PocketWatch({ size = 64, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="watchGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      
      {/* Chain loop */}
      <ellipse cx="32" cy="8" rx="6" ry="4" stroke="url(#watchGold)" strokeWidth="2" fill="none" />
      
      {/* Watch body */}
      <circle cx="32" cy="36" r="24" fill="#1C1917" stroke="url(#watchGold)" strokeWidth="3" />
      
      {/* Inner ring */}
      <circle cx="32" cy="36" r="20" stroke="#44403C" strokeWidth="1" fill="none" />
      
      {/* Watch face */}
      <circle cx="32" cy="36" r="18" fill="#0C0A09" />
      
      {/* Hour markers */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <line
          key={i}
          x1={32 + 14 * Math.cos((angle - 90) * Math.PI / 180)}
          y1={36 + 14 * Math.sin((angle - 90) * Math.PI / 180)}
          x2={32 + 16 * Math.cos((angle - 90) * Math.PI / 180)}
          y2={36 + 16 * Math.sin((angle - 90) * Math.PI / 180)}
          stroke="#F59E0B"
          strokeWidth={i % 3 === 0 ? "2" : "1"}
        />
      ))}
      
      {/* Hour hand */}
      <line x1="32" y1="36" x2="32" y2="26" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      
      {/* Minute hand */}
      <line x1="32" y1="36" x2="42" y2="36" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Center */}
      <circle cx="32" cy="36" r="2" fill="#F59E0B" />
      
      {/* "I'm late" text curve suggestion */}
      <text x="32" y="48" textAnchor="middle" fill="#78716C" fontSize="4" fontFamily="serif">
        I&apos;m late
      </text>
    </svg>
  );
}

export function CheshireCatSmile({ size = 80, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="smileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
          <stop offset="20%" stopColor="#F59E0B" />
          <stop offset="80%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* The iconic Cheshire smile */}
      <path
        d="M10 25 Q25 35, 50 35 Q75 35, 90 25"
        stroke="url(#smileGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Teeth suggestion */}
      {[20, 30, 40, 50, 60, 70, 80].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1="28"
          x2={x}
          y2="32"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.7}
        />
      ))}
    </svg>
  );
}

export function FallingCards({ className }: { className?: string }) {
  const cards = ["♠", "♥", "♦", "♣"];
  // Use fixed durations to avoid hydration mismatch (no Math.random())
  const durations = [8, 10, 9, 11, 8.5, 10.5, 9.5, 11.5];
  
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall text-2xl"
          style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${durations[i]}s`,
          }}
        >
          <span className={i % 2 === 0 ? "text-honey-500/30" : "text-red-500/30"}>
            {cards[i % 4]}
          </span>
        </div>
      ))}
    </div>
  );
}
