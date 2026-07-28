import {
  getLocalStory,
  getLocalStoryPages,
  localCategories,
  localStories,
} from "@/lib/local-content";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import type {
  Category,
  CategoryRecord,
  Story,
  StoryPage,
  StoryPageRecord,
  StoryRecord,
} from "@/types/content";

type StoryMatch = {
  localStory: Story;
  remoteStoryId: string;
};

const localCategoryById = new Map(localCategories.map((category) => [category.id, category]));
const localCategoryByName = new Map(localCategories.map((category) => [category.name, category]));
const localStoryById = new Map(localStories.map((story) => [story.id, story]));
const localStoryByTitle = new Map(localStories.map((story) => [story.title, story]));
const localStoryByImageName = new Map(
  localStories
    .filter((story): story is Story & { image: string } => Boolean(story.image))
    .map((story) => [getImageName(story.image), story] as const),
);

function getImageName(path: string) {
  return path.split("/").filter(Boolean).at(-1) ?? path;
}

function getStoryVisualFallback(story: Story) {
  return {
    emoji: story.emoji,
    gradient: story.gradient,
    minutes: story.minutes,
    author: story.author,
    isNew: story.isNew ?? false,
  };
}

function buildDefaultCategory(record: CategoryRecord): Category {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    createdAt: record.created_at,
    image: "/categories/animais.png",
    gradient: "from-sky-300 to-blue-500",
  };
}

function buildDefaultStory(record: StoryRecord): Story {
  return {
    id: record.id,
    title: record.title,
    description: record.description ?? "",
    categoryId: record.category_id,
    image: record.cover_image,
    emoji: "📖",
    gradient: "from-sky-300 to-blue-500",
    minutes: 5,
    author: "Kids Stories",
    isNew: false,
    isPublished: record.is_published ?? true,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
    pageCount: 0,
    pages: [],
  };
}

function sortStoriesLikeLocal(stories: Story[]) {
  const localIndex = new Map(localStories.map((story, index) => [story.id, index]));

  return [...stories].sort((left, right) => {
    const leftIndex = localIndex.get(left.id);
    const rightIndex = localIndex.get(right.id);

    if (leftIndex !== undefined && rightIndex !== undefined) {
      return leftIndex - rightIndex;
    }

    if (leftIndex !== undefined) {
      return -1;
    }

    if (rightIndex !== undefined) {
      return 1;
    }

    return left.title.localeCompare(right.title, "pt-BR");
  });
}

function findLocalStoryMatch(record: StoryRecord) {
  const byTitle = localStoryByTitle.get(record.title);

  if (byTitle) {
    return byTitle;
  }

  if (!record.cover_image) {
    return null;
  }

  return localStoryByImageName.get(getImageName(record.cover_image)) ?? null;
}

function mapCategoryRecord(record: CategoryRecord): Category {
  const localCategory = localCategoryByName.get(record.name);

  if (!localCategory) {
    return buildDefaultCategory(record);
  }

  return {
    ...localCategory,
    description: record.description ?? localCategory.description ?? null,
    createdAt: record.created_at ?? localCategory.createdAt ?? null,
  };
}

function mapStoryRecord(record: StoryRecord): Story {
  const localStory = findLocalStoryMatch(record);

  if (!localStory) {
    return buildDefaultStory(record);
  }

  const localCategory = localStory.categoryId ? localCategoryById.get(localStory.categoryId) : null;

  return {
    id: localStory.id,
    title: record.title,
    description: record.description ?? localStory.description,
    categoryId: localCategory?.id ?? localStory.categoryId,
    image: record.cover_image ?? localStory.image ?? null,
    ...getStoryVisualFallback(localStory),
    isPublished: record.is_published ?? localStory.isPublished,
    createdAt: record.created_at ?? localStory.createdAt ?? null,
    updatedAt: record.updated_at ?? localStory.updatedAt ?? null,
    pageCount: localStory.pageCount,
    pages: [...localStory.pages],
  };
}

function mapStoryPageRecord(localStoryId: string, record: StoryPageRecord): StoryPage {
  return {
    id: `${localStoryId}-page-${record.page_number}`,
    storyId: localStoryId,
    pageNumber: record.page_number,
    text: record.text,
    imageUrl: record.image_url,
    createdAt: record.created_at,
  };
}

export function getLocalCategorySnapshot() {
  return [...localCategories];
}

export function getLocalStorySnapshot() {
  return localStories.map((story) => ({ ...story, pages: [...story.pages] }));
}

export function getLocalStoryPageSnapshot(storyId: string) {
  return getLocalStoryPages(storyId).map((page) => ({ ...page }));
}

export async function fetchRemoteCategories() {
  if (!isSupabaseConfigured) {
    return null;
  }

  const client = getSupabaseClient();
  const { data, error } = await client
    .from("categories")
    .select("id, name, description, created_at")
    .returns<CategoryRecord[]>();

  if (error) {
    throw error;
  }

  const merged = localCategories.map((localCategory) => {
    const remoteCategory = data.find((record) => record.name === localCategory.name);
    return remoteCategory ? mapCategoryRecord(remoteCategory) : { ...localCategory };
  });

  const remaining = data
    .filter((record) => !localCategoryByName.has(record.name))
    .map((record) => mapCategoryRecord(record));

  return [...merged, ...remaining];
}

export async function fetchRemoteStories() {
  if (!isSupabaseConfigured) {
    return null;
  }

  const client = getSupabaseClient();
  const { data, error } = await client
    .from("stories")
    .select(
      "id, title, description, cover_image, category_id, is_published, created_at, updated_at",
    )
    .eq("is_published", true)
    .returns<StoryRecord[]>();

  if (error) {
    throw error;
  }

  return sortStoriesLikeLocal(data.map((record) => mapStoryRecord(record)));
}

export async function findRemoteStoryMatch(localStoryId: string): Promise<StoryMatch | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const localStory = getLocalStory(localStoryId);

  if (!localStory) {
    return null;
  }

  const client = getSupabaseClient();
  const { data, error } = await client
    .from("stories")
    .select(
      "id, title, description, cover_image, category_id, is_published, created_at, updated_at",
    )
    .eq("title", localStory.title)
    .eq("is_published", true)
    .maybeSingle<StoryRecord>();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    localStory,
    remoteStoryId: data.id,
  };
}

export async function fetchRemoteStoryPages(localStoryId: string) {
  const match = await findRemoteStoryMatch(localStoryId);

  if (!match) {
    return null;
  }

  const client = getSupabaseClient();
  const { data, error } = await client
    .from("story_pages")
    .select("id, story_id, page_number, text, image_url, created_at")
    .eq("story_id", match.remoteStoryId)
    .order("page_number", { ascending: true })
    .returns<StoryPageRecord[]>();

  if (error) {
    throw error;
  }

  return data.map((record) => mapStoryPageRecord(match.localStory.id, record));
}

export function logSupabaseFallback(scope: string, error: unknown) {
  console.warn(`[content] usando fallback local em ${scope}`, error);
}

export function mergeStoryWithRemotePages(story: Story, pages: StoryPage[]) {
  return {
    ...story,
    pages: pages.map((page) => page.text),
    pageCount: pages.length,
  };
}

export function getLocalStoryById(storyId: string) {
  const story = localStoryById.get(storyId);
  return story ? { ...story, pages: [...story.pages] } : null;
}
