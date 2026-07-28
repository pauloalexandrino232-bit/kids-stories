import {
  fetchRemoteStoryPages,
  getLocalStoryPageSnapshot,
  logSupabaseFallback,
} from "@/services/content-adapter";

export async function getStoryPages(storyId: string) {
  try {
    const remotePages = await fetchRemoteStoryPages(storyId);
    return remotePages ?? getLocalStoryPageSnapshot(storyId);
  } catch (error) {
    logSupabaseFallback("story-pages", error);
    return getLocalStoryPageSnapshot(storyId);
  }
}
