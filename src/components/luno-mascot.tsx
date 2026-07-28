import { cn } from "@/lib/utils";

export function LunoMascot({ className, size = 64 }: { className?: string; size?: number }) {
  return (
    <div className={cn("relative inline-block animate-float", className)} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-70"
        style={{ background: "radial-gradient(circle, oklch(0.9 0.2 85 / 0.9), transparent 65%)" }}
      />
      <svg viewBox="0 0 100 100" className="relative w-full h-full">
        <ellipse cx="30" cy="45" rx="14" ry="9" fill="oklch(0.95 0.02 220 / 0.75)" />
        <ellipse cx="70" cy="45" rx="14" ry="9" fill="oklch(0.95 0.02 220 / 0.75)" />
        <circle cx="50" cy="52" r="22" fill="url(#lunoGrad)" />
        <defs>
          <radialGradient id="lunoGrad" cx="0.4" cy="0.35" r="0.75">
            <stop offset="0%" stopColor="oklch(0.98 0.15 95)" />
            <stop offset="70%" stopColor="oklch(0.82 0.19 75)" />
            <stop offset="100%" stopColor="oklch(0.68 0.19 45)" />
          </radialGradient>
        </defs>
        <circle cx="43" cy="49" r="2.6" fill="#2a1a00" />
        <circle cx="57" cy="49" r="2.6" fill="#2a1a00" />
        <circle cx="43.8" cy="48.2" r="0.9" fill="#fff" />
        <circle cx="57.8" cy="48.2" r="0.9" fill="#fff" />
        <path d="M43 57 Q50 63 57 57" stroke="#2a1a00" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <circle cx="38" cy="56" r="2" fill="oklch(0.75 0.2 25 / 0.55)" />
        <circle cx="62" cy="56" r="2" fill="oklch(0.75 0.2 25 / 0.55)" />
        <path d="M50 30 Q52 22 48 18" stroke="oklch(0.4 0.05 60)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="48" cy="17" r="3" fill="oklch(0.95 0.18 95)" className="animate-twinkle" />
      </svg>
    </div>
  );
}