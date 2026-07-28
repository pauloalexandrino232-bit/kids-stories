import { createFileRoute, Link } from "@tanstack/react-router";
import { LunoMascot } from "@/components/luno-mascot";
import { useStoriesQuery } from "@/hooks/use-content";
import { achievements, collectibles } from "@/lib/stories";
import { useUserState } from "@/lib/user-state";

export const Route = createFileRoute("/_app/perfil")({
  component: ProfilePage,
});

function ProfilePage() {
  const { state, update } = useUserState();
  const storiesQuery = useStoriesQuery();
  const stories = storiesQuery.data ?? [];
  const unlocked = collectibles.filter((item) => item.unlocked).length;
  const favs = state.favorites.map((id) => stories.find((story) => story.id === id)).filter(Boolean);

  const stats = [
    { label: "Dias seguidos", value: state.streak, emoji: "🔥" },
    { label: "Concluídas", value: state.completed.length, emoji: "📚" },
    { label: "Favoritas", value: state.favorites.length, emoji: "❤️" },
    { label: "Minutos lidos", value: state.minutesRead, emoji: "⏱️" },
  ];

  return (
    <div className="space-y-5 pt-2">
      <div className="flex items-center gap-4 rounded-3xl bg-white/90 p-5 shadow-card">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-sun text-5xl shadow-card">
          {state.avatar}
        </div>
        <div className="flex-1">
          <input
            value={state.name}
            onChange={(e) => update({ name: e.target.value })}
            className="w-full border-b border-transparent bg-transparent font-display text-xl font-bold outline-none focus:border-primary/50"
          />
          <p className="text-xs text-muted-foreground">Toque no nome para editar.</p>
          <div className="mt-2 flex gap-1">
            {["🦁", "🐼", "🦊", "🐧", "🦄", "🐸"].map((avatar) => (
              <button
                key={avatar}
                onClick={() => update({ avatar })}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xl ${
                  state.avatar === avatar ? "bg-primary/20 ring-2 ring-primary" : "hover:bg-muted"
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white/90 p-4 shadow-card">
            <div className="text-2xl">{stat.emoji}</div>
            <div className="font-display text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 rounded-3xl bg-gradient-magic p-4 text-white shadow-card">
        <LunoMascot size={56} />
        <div className="flex-1">
          <p className="font-display font-bold">
            {unlocked} itens · {achievements.filter((item) => item.progress >= item.goal).length} conquistas
          </p>
          <p className="text-xs opacity-90">Continue lendo para desbloquear mais!</p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-bold">Favoritas</h2>
        {storiesQuery.isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="h-20 rounded-2xl bg-white/75 shadow-card animate-pulse" />
            ))}
          </div>
        ) : favs.length === 0 ? (
          <div className="rounded-2xl bg-white/80 p-6 text-center text-sm text-muted-foreground shadow-card">
            Você ainda não favoritou nenhuma história.{" "}
            <Link to="/biblioteca" className="font-semibold text-primary">
              Explorar
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favs.map(
              (story) =>
                story && (
                  <Link
                    key={story.id}
                    to="/historia/$id"
                    params={{ id: story.id }}
                    className={`flex items-center gap-3 rounded-2xl bg-gradient-to-br p-3 text-white shadow-card ${story.gradient}`}
                  >
                    <span className="text-3xl">{story.emoji}</span>
                    <span className="line-clamp-2 font-display text-sm font-semibold">{story.title}</span>
                  </Link>
                ),
            )}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-bold">Concluídas ({state.completed.length})</h2>
        {storiesQuery.isLoading ? (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-8 w-32 rounded-full bg-white/75 shadow-card animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {state.completed.map((id) => {
              const story = stories.find((item) => item.id === id);
              if (!story) return null;

              return (
                <span key={id} className="rounded-full bg-white/90 px-3 py-1.5 text-xs shadow-card">
                  {story.emoji} {story.title}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
