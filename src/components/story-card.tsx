import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { StoryArt } from "@/components/story-art";
import { getStoryImage } from "@/lib/story-images";
import type { Story } from "@/lib/stories";
import { cn } from "@/lib/utils";

export function StoryCard({
  story,
  size = "md",
  favorite,
  onFavorite,
}: {
  story: Story;
  size?: "sm" | "md" | "lg";
  favorite?: boolean;
  onFavorite?: () => void;
}) {
  const hasImage = Boolean(getStoryImage(story));
  const dims =
    size === "lg"
      ? "w-full aspect-square"
      : size === "sm"
        ? "w-40 aspect-square"
        : "w-56 aspect-square";

  return (
    <div className={cn("group relative shrink-0", dims)}>
      <Link
        to="/historia/$id"
        params={{ id: story.id }}
        className="block h-full w-full rounded-2xl overflow-hidden shadow-card relative"
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br", story.gradient)} />
        <StoryArt
          story={story}
          imageClassName={cn(
            "absolute inset-0 h-full w-full",
            hasImage
              ? cn(
                  "object-cover scale-[1.06] sm:scale-[1.03]",
                  story.title === "O Laboratório da Luz" && "object-[70%_35%]",
                )
              : "object-contain p-2",
          )}
          fallbackClassName="absolute inset-0"
          emojiClassName="text-7xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/5" />
        {story.isNew && (
          <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/95 text-primary">
            Novo
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/25 to-transparent text-white">
          <p className="text-[11px] opacity-90">{story.minutes} min · {story.author}</p>
          <h3 className="font-display font-semibold text-sm sm:text-base leading-tight line-clamp-2">
            {story.title}
          </h3>
        </div>
      </Link>
      {onFavorite && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onFavorite();
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-card hover:scale-110 transition"
          aria-label={favorite ? "Remover dos favoritos" : "Favoritar"}
        >
          <Heart className={cn("w-4 h-4", favorite ? "fill-rose-500 text-rose-500" : "text-slate-500")} />
        </button>
      )}
    </div>
  );
}
