import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { collectibles } from "@/lib/stories";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/colecao")({
  component: CollectionPage,
});

function CollectionPage() {
  const unlocked = collectibles.filter((c) => c.unlocked).length;
  return (
    <div className="pt-2 space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Coleção</h1>
          <p className="text-sm text-muted-foreground">Desbloqueie itens ao concluir histórias.</p>
        </div>
        <span className="text-xs font-bold bg-white/90 px-3 py-1 rounded-full shadow-card">
          {unlocked}/{collectibles.length}
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {collectibles.map((c) => (
          <div
            key={c.id}
            className={cn(
              "aspect-square rounded-2xl p-2 flex flex-col items-center justify-center gap-1 shadow-card relative overflow-hidden text-center",
              c.unlocked ? "text-white" : "bg-white/80 text-muted-foreground",
            )}
          >
            {c.unlocked && <div className={cn("absolute inset-0 bg-gradient-to-br", c.gradient)} />}
            <div className={cn("relative text-4xl transition", c.unlocked ? "" : "grayscale opacity-30")}>
              {c.emoji}
            </div>
            <span className="relative text-[10px] font-bold leading-tight">
              {c.unlocked ? c.name : "???"}
            </span>
            {!c.unlocked && <Lock className="absolute top-2 right-2 w-3.5 h-3.5 text-muted-foreground" />}
          </div>
        ))}
      </div>
    </div>
  );
}