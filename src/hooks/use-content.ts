import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categories";
import { getStoryPages } from "@/services/story-pages";
import { getStories, getStoriesByCategory, getStory } from "@/services/stories";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export function useStoriesQuery() {
  return useQuery({
    queryKey: ["stories"],
    queryFn: getStories,
  });
}

export function useStoriesByCategoryQuery(categoryId?: string) {
  return useQuery({
    queryKey: ["stories", "category", categoryId],
    queryFn: () => getStoriesByCategory(categoryId!),
    enabled: Boolean(categoryId),
  });
}

export function useStoryQuery(storyId?: string) {
  return useQuery({
    queryKey: ["stories", storyId],
    queryFn: () => getStory(storyId!),
    enabled: Boolean(storyId),
  });
}

export function useStoryPagesQuery(storyId?: string) {
  return useQuery({
    queryKey: ["story-pages", storyId],
    queryFn: () => getStoryPages(storyId!),
    enabled: Boolean(storyId),
  });
}
