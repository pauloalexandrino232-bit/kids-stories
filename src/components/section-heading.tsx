import type { ReactNode } from "react";

export function SectionHeading({
  title,
  action,
  emoji,
  bubble = false,
}: {
  title: string;
  action?: ReactNode;
  emoji?: string;
  bubble?: boolean;
}) {
  return (
    <div className="flex items-end justify-between px-1 mb-3">
      <h2
        className={[
          "font-display font-bold text-xl sm:text-2xl text-foreground flex items-center gap-2",
          bubble
            ? "rounded-2xl border border-sky-200/70 bg-gradient-to-br from-sky-300/95 via-blue-200/92 to-indigo-200/95 px-4 py-2 shadow-card backdrop-blur-sm"
            : "",
        ].join(" ")}
      >
        {emoji && <span aria-hidden>{emoji}</span>} {title}
      </h2>
      {action}
    </div>
  );
}
