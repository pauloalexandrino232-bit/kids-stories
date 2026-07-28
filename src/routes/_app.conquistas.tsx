import { createFileRoute } from "@tanstack/react-router";
import { achievements } from "@/lib/stories";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/conquistas")({
  component: AchievementsPage,
});

function AchievementsPage() {
  return (
    <div className="pt-2 space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Conquistas</h1>
        <p className="text-sm text-muted-foreground">Cada história é uma nova vitória!</p>
      </div>
      <div className="grid gap-3">
        {achievements.map((a) => {
          const pct = Math.min(100, Math.round((a.progress / a.goal) * 100));
          const done = a.progress >= a.goal;
          return (
            <div
              key={a.id}
              className={cn(
                "rounded-3xl p-4 shadow-card border border-white/60 relative overflow-hidden",
                done ? "text-white" : "bg-white/90",
              )}
            >
              {done && <div className={cn("absolute inset-0 bg-gradient-to-br opacity-95", a.gradient)} />}
              <div className="relative flex items-center gap-4">
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-card",
                    done ? "bg-white/25" : `bg-gradient-to-br ${a.gradient} text-white`,
                  )}
                >
                  {a.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display font-bold">{a.title}</h3>
                    <span className="text-xs font-bold">{a.progress}/{a.goal}</span>
                  </div>
                  <p className={cn("text-xs", done ? "opacity-90" : "text-muted-foreground")}>
                    {a.description}
                  </p>
                  <div className={cn("mt-2 h-1.5 rounded-full overflow-hidden", done ? "bg-white/30" : "bg-muted")}>
                    <div className="h-full bg-white/95" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}