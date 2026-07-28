import type { Story } from "@/types/content";

export function getStoryImage(story: Pick<Story, "image">) {
  return story.image ?? undefined;
}
