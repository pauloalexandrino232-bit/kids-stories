import {
  fetchRemoteStories,
  getLocalStoryById,
  getLocalStorySnapshot,
  logSupabaseFallback,
} from "@/services/content-adapter";

export async function getStories() {
  try {
    const remoteStories = await fetchRemoteStories();
    return remoteStories ?? getLocalStorySnapshot().filter((story) => story.isPublished);
  } catch (error) {
    logSupabaseFallback("stories", error);
    return getLocalStorySnapshot().filter((story) => story.isPublished);
  }
}

export async function getStoriesByCategory(categoryId: string) {
  const stories = await getStories();
  return stories.filter((story) => story.isPublished && story.categoryId === categoryId);
}

export async function getStory(storyId: string) {
  const stories = await getStories();
  return stories.find((story) => story.id === storyId) ?? getLocalStoryById(storyId);
}
