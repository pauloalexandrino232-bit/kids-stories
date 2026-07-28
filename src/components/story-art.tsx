import { useEffect, useState } from "react";
import { getStoryImage } from "@/lib/story-images";
import type { Story } from "@/lib/stories";
import { cn } from "@/lib/utils";

type StoryArtProps = {
  story: Story;
  imageClassName?: string;
  fallbackClassName?: string;
  emojiClassName?: string;
};

export function StoryArt({
  story,
  imageClassName,
  fallbackClassName,
  emojiClassName,
}: StoryArtProps) {
  const [hasError, setHasError] = useState(false);
  const image = getStoryImage(story);

  useEffect(() => {
    setHasError(false);
  }, [image]);

  if (!image || hasError) {
    return (
      <div className={cn("flex items-center justify-center", fallbackClassName)}>
        <span className={cn("drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]", emojiClassName)}>
          {story.emoji}
        </span>
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={story.title}
      className={imageClassName}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
