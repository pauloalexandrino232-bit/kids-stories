import bg from "@/assets/background-novo.png";
import type { ReactNode } from "react";

export function SceneBackground({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full relative isolate">
      <img
        src={bg}
        alt=""
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full select-none object-cover object-[14%_top] sm:object-[22%_top]"
        style={{
          filter: "saturate(1.18) contrast(1.08) brightness(1.01)",
          transform: "translateZ(0)",
        }}
        aria-hidden
      />
      <div
        className="fixed inset-x-0 bottom-0 -z-10 h-[55vh] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, oklch(0.99 0.01 220 / 0.18) 68%, oklch(0.99 0.01 220 / 0.44) 84%, oklch(0.99 0.01 220 / 0.7))",
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}
