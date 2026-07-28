export type Category = {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string | null;
  image: string;
  gradient: string;
};

export type Story = {
  id: string;
  title: string;
  description: string;
  categoryId: string | null;
  image?: string | null;
  emoji: string;
  gradient: string;
  minutes: number;
  author: string;
  isNew?: boolean;
  isPublished: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
  pageCount: number;
  pages: string[];
};

export type StoryPage = {
  id: string;
  storyId: string;
  pageNumber: number;
  text: string;
  imageUrl?: string | null;
  createdAt?: string | null;
};

export type CategoryRecord = {
  id: string;
  name: string;
  description: string | null;
  created_at: string | null;
};

export type StoryRecord = {
  id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  category_id: string | null;
  is_published: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

export type StoryPageRecord = {
  id: string;
  story_id: string;
  page_number: number;
  text: string;
  image_url: string | null;
  created_at: string | null;
};
