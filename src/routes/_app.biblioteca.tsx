import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { StoryCard } from "@/components/story-card";
import { useCategoriesQuery, useStoriesQuery } from "@/hooks/use-content";
import { useUserState } from "@/lib/user-state";
import { cn } from "@/lib/utils";

type LibrarySearch = { cat?: string; filter?: "todas" | "favoritas" | "recentes" | "populares" };

export const Route = createFileRoute("/_app/biblioteca")({
  validateSearch: (s: Record<string, unknown>): LibrarySearch => ({
    cat: typeof s.cat === "string" ? s.cat : undefined,
    filter: (["todas", "favoritas", "recentes", "populares"] as const).includes(s.filter as never)
      ? (s.filter as LibrarySearch["filter"])
      : "todas",
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const { cat, filter } = Route.useSearch();
  const navigate = useNavigate({ from: "/biblioteca" });
  const { state, toggleFavorite } = useUserState();
  const categoriesQuery = useCategoriesQuery();
  const storiesQuery = useStoriesQuery();
  const [q, setQ] = useState("");

  const categories = categoriesQuery.data ?? [];
  const stories = storiesQuery.data ?? [];

  const filtered = useMemo(() => {
    let list = stories;
    if (cat) list = list.filter((story) => story.categoryId === cat);
    if (filter === "favoritas") list = list.filter((story) => state.favorites.includes(story.id));
    if (filter === "recentes") list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter(
        (story) =>
          story.title.toLowerCase().includes(needle) ||
          story.author.toLowerCase().includes(needle) ||
          story.description.toLowerCase().includes(needle),
      );
    }
    return list;
  }, [cat, filter, q, state.favorites, stories]);

  const filters: { id: NonNullable<LibrarySearch["filter"]>; label: string }[] = [
    { id: "todas", label: "Todas" },
    { id: "favoritas", label: "Favoritas" },
    { id: "recentes", label: "Mais recentes" },
    { id: "populares", label: "Mais populares" },
  ];

  return (
    <div className="space-y-6 pt-2">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Biblioteca</h1>
        <p className="text-sm text-muted-foreground">Encontre a próxima aventura.</p>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Pesquisar histórias, autores..."
          className="h-12 w-full rounded-2xl border border-white/70 bg-white/95 pl-11 pr-4 shadow-card outline-none placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/60"
        />
      </div>

      {categoriesQuery.isLoading ? (
        <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[54px] min-w-[7.5rem] shrink-0 rounded-2xl bg-white/70 shadow-card animate-pulse"
            />
          ))}
        </div>
      ) : categoriesQuery.isError ? (
        <div className="rounded-3xl bg-white/85 p-4 text-sm text-muted-foreground shadow-card">
          Não foi possível carregar as categorias agora.
        </div>
      ) : (
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
          <button
            onClick={() =>
              navigate({
                search: (prev: LibrarySearch) => ({ ...prev, cat: undefined }),
                resetScroll: false,
              })
            }
            className={cn(
              "inline-flex min-w-[7.5rem] shrink-0 items-center justify-center rounded-2xl border px-4 py-3 text-foreground shadow-card backdrop-blur-sm transition hover:-translate-y-0.5",
              !cat
                ? "border-foreground bg-foreground text-background"
                : "border-sky-200/70 bg-gradient-to-br from-sky-300/95 via-blue-200/92 to-indigo-200/95",
            )}
          >
            <span className="text-center font-display text-base font-semibold leading-none">Todas</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                navigate({
                  search: (prev: LibrarySearch) => ({ ...prev, cat: category.id }),
                  resetScroll: false,
                })
              }
              className={cn(
                "inline-flex min-w-[7.5rem] shrink-0 items-center justify-center rounded-2xl border px-4 py-3 text-foreground shadow-card backdrop-blur-sm transition hover:-translate-y-0.5",
                cat === category.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-sky-200/70 bg-gradient-to-br from-sky-300/95 via-blue-200/92 to-indigo-200/95",
              )}
            >
              <span className="text-center font-display text-base font-semibold leading-none">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {filters.map((currentFilter) => (
          <button
            key={currentFilter.id}
            onClick={() =>
              navigate({
                search: (prev: LibrarySearch) => ({ ...prev, filter: currentFilter.id }),
                resetScroll: false,
              })
            }
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition",
              filter === currentFilter.id
                ? "bg-foreground text-background"
                : "bg-white/60 text-foreground",
            )}
          >
            {currentFilter.label}
          </button>
        ))}
      </div>

      <SectionHeading title={`${filtered.length} histórias`} />

      {storiesQuery.isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square rounded-2xl bg-white/75 shadow-card animate-pulse"
            />
          ))}
        </div>
      ) : storiesQuery.isError ? (
        <div className="rounded-3xl bg-white/85 p-4 text-sm text-muted-foreground shadow-card">
          Não foi possível carregar as histórias agora.
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl bg-white/80 p-8 text-center shadow-card">
          <div className="mb-2 text-4xl">🔎</div>
          <p className="font-display font-semibold">Nenhuma história encontrada</p>
          <p className="text-sm text-muted-foreground">Tente outra categoria ou pesquisa.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              size="lg"
              favorite={state.favorites.includes(story.id)}
              onFavorite={() => toggleFavorite(story.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
