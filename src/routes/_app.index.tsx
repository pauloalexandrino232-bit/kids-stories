import { createFileRoute, Link } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { CategoryCard } from "@/components/category-card";
import { SectionHeading } from "@/components/section-heading";
import { StoryArt } from "@/components/story-art";
import { StoryCard } from "@/components/story-card";
import { useCategoriesQuery, useStoriesQuery } from "@/hooks/use-content";
import { useUserState } from "@/lib/user-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
});

function HomePage() {
  const { state, toggleFavorite } = useUserState();
  const categoriesQuery = useCategoriesQuery();
  const storiesQuery = useStoriesQuery();

  const categories = categoriesQuery.data ?? [];
  const stories = storiesQuery.data ?? [];
  const current = state.currentStory ? stories.find((story) => story.id === state.currentStory?.id) : undefined;
  const continueReadingStories = current
    ? [current, ...stories.filter((story) => story.id !== current.id).slice(0, 1)]
    : [];
  const recommended = stories.filter((story) => story.id !== current?.id).slice(0, 6);
  const news = stories.filter((story) => story.isNew);

  return (
    <div className="space-y-6 pt-8 sm:space-y-8 sm:pt-2">
      <section>
        <SectionHeading title="Categorias" emoji="🎨" />
        {categoriesQuery.isLoading ? (
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[54px] min-w-[7.5rem] shrink-0 rounded-2xl bg-white/70 shadow-card animate-pulse"
              />
            ))}
          </div>
        ) : categoriesQuery.isError ? (
          <ContentErrorCard message="Não foi possível carregar as categorias agora." />
        ) : (
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeading
          title="Recomendadas para você"
          emoji="✨"
          bubble
          action={
            <Link to="/biblioteca" className="text-xs font-semibold text-primary">
              Ver todas
            </Link>
          }
        />
        {storiesQuery.isLoading ? (
          <StoryCardRowSkeleton />
        ) : storiesQuery.isError ? (
          <ContentErrorCard message="Não foi possível carregar as histórias agora." />
        ) : (
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2">
            {recommended.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                favorite={state.favorites.includes(story.id)}
                onFavorite={() => toggleFavorite(story.id)}
              />
            ))}
          </div>
        )}
      </section>

      {current && (
        <section>
          <SectionHeading title="Continue lendo" emoji="📖" bubble />
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2">
            <Link
              to="/historia/$id"
              params={{ id: current.id }}
              className="group relative block w-56 shrink-0 overflow-hidden rounded-2xl shadow-card"
            >
              <div
                className={cn(
                  "relative flex aspect-square items-center justify-center bg-gradient-to-br",
                  current.gradient,
                )}
              >
                <StoryArt
                  story={current}
                  imageClassName="absolute inset-0 h-full w-full object-cover scale-[1.03]"
                  fallbackClassName="absolute inset-0"
                  emojiClassName="text-5xl sm:text-7xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-white">
                  <div>
                    <p className="text-[10px] opacity-90">
                      Página {(state.currentStory?.page ?? 0) + 1} de {current.pageCount || current.pages.length}
                    </p>
                    <h3 className="font-display text-sm font-bold leading-tight">{current.title}</h3>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-card transition group-hover:scale-110">
                    <PlayCircle className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
            {continueReadingStories.slice(1).map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                favorite={state.favorites.includes(story.id)}
                onFavorite={() => toggleFavorite(story.id)}
              />
            ))}
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section>
          <SectionHeading title="Novidades" emoji="🆕" bubble />
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2">
            {news.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                favorite={state.favorites.includes(story.id)}
                onFavorite={() => toggleFavorite(story.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StoryCardRowSkeleton() {
  return (
    <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="aspect-square w-56 shrink-0 rounded-2xl bg-white/75 shadow-card animate-pulse"
        />
      ))}
    </div>
  );
}

function ContentErrorCard({ message }: { message: string }) {
  return (
    <div className="rounded-3xl bg-white/85 p-4 text-sm text-muted-foreground shadow-card">
      {message}
    </div>
  );
}
