import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Trophy, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Início", icon: Home },
  { to: "/biblioteca", label: "Biblioteca", icon: BookOpen },
  { to: "/colecao", label: "Coleção", icon: Sparkles },
  { to: "/conquistas", label: "Conquistas", icon: Trophy },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function BottomNav({ embedded = false }: { embedded?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      className={cn(
        embedded
          ? "relative inset-auto z-auto max-w-none"
          : "fixed bottom-3 inset-x-3 z-40 mx-auto max-w-md sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2",
      )}
    >
      <ul
        className={cn(
          "flex items-center justify-between gap-1 rounded-3xl px-2 py-2",
          embedded
            ? "border border-amber-200/70 bg-white/92 shadow-card"
            : "border border-white/60 bg-white/90 shadow-pop backdrop-blur-lg",
        )}
      >
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-2xl transition",
                  active
                    ? "bg-gradient-sun text-white shadow-card scale-105"
                    : "text-slate-500 hover:text-primary",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
