import {
  fetchRemoteCategories,
  getLocalCategorySnapshot,
  logSupabaseFallback,
} from "@/services/content-adapter";

export async function getCategories() {
  try {
    const remoteCategories = await fetchRemoteCategories();
    return remoteCategories ?? getLocalCategorySnapshot();
  } catch (error) {
    logSupabaseFallback("categories", error);
    return getLocalCategorySnapshot();
  }
}
