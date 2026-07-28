import { legacyStories } from "@/lib/stories-legacy";
import type { Category, Story, StoryPage } from "@/types/content";

export const localCategories: Category[] = [
  {
    id: "animais",
    name: "Animais",
    description: "Histórias divertidas com animais",
    createdAt: null,
    image: "/categories/animais.png",
    gradient: "from-emerald-300 to-teal-400",
  },
  {
    id: "fantasia",
    name: "Fantasia",
    description: "Aventuras mágicas e cheias de encanto",
    createdAt: null,
    image: "/categories/fantasia.webp",
    gradient: "from-fuchsia-300 to-violet-500",
  },
  {
    id: "espaco",
    name: "Espaço",
    description: "Viagens espaciais e descobertas incríveis",
    createdAt: null,
    image: "/categories/espaco.webp",
    gradient: "from-indigo-400 to-slate-700",
  },
  {
    id: "dinossauros",
    name: "Dinossauros",
    description: "Histórias jurássicas cheias de coragem",
    createdAt: null,
    image: "/categories/dinossauros.webp",
    gradient: "from-lime-300 to-green-600",
  },
  {
    id: "piratas",
    name: "Piratas",
    description: "Mapas, mares e tesouros imaginários",
    createdAt: null,
    image: "/categories/piratas.webp",
    gradient: "from-amber-300 to-red-500",
  },
  {
    id: "natureza",
    name: "Natureza",
    description: "Jardins, sementes e segredos da floresta",
    createdAt: null,
    image: "/categories/natureza.webp",
    gradient: "from-green-300 to-emerald-500",
  },
  {
    id: "ciencia",
    name: "Ciência",
    description: "Experimentos curiosos e descobertas brilhantes",
    createdAt: null,
    image: "/categories/ciencia.webp",
    gradient: "from-sky-300 to-blue-600",
  },
];

export const localStories: Story[] = legacyStories.map((story) => ({
  ...story,
  pages: [...story.pages],
  pageCount: story.pages.length,
}));

export const localStoryPages: StoryPage[] = localStories.flatMap((story) =>
  story.pages.map((text, index) => ({
    id: `${story.id}-page-${index + 1}`,
    storyId: story.id,
    pageNumber: index + 1,
    text,
    imageUrl: null,
    createdAt: null,
  })),
);

export function getLocalStory(storyId: string) {
  return localStories.find((story) => story.id === storyId) ?? null;
}

export function getLocalStoryPages(storyId: string) {
  return localStoryPages
    .filter((page) => page.storyId === storyId)
    .sort((a, b) => a.pageNumber - b.pageNumber);
}
