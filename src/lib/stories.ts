export type { Category, Story, StoryPage } from "@/types/content";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  progress: number;
  goal: number;
  gradient: string;
};

export const achievements: Achievement[] = [
  {
    id: "primeira",
    title: "Primeira História",
    description: "Você leu sua primeira aventura!",
    emoji: "🏅",
    progress: 1,
    goal: 1,
    gradient: "from-amber-300 to-orange-500",
  },
  {
    id: "curioso",
    title: "Leitor Curioso",
    description: "Explorou 3 categorias diferentes.",
    emoji: "⭐",
    progress: 2,
    goal: 3,
    gradient: "from-sky-300 to-blue-500",
  },
  {
    id: "dez",
    title: "10 Histórias Lidas",
    description: "Uma pequena biblioteca já!",
    emoji: "📚",
    progress: 4,
    goal: 10,
    gradient: "from-emerald-300 to-teal-500",
  },
  {
    id: "sequencia",
    title: "Sequência de 7 Dias",
    description: "Uma semana inteira de leitura.",
    emoji: "🔥",
    progress: 3,
    goal: 7,
    gradient: "from-rose-300 to-red-500",
  },
  {
    id: "noite",
    title: "Hora da Leitura",
    description: "Leu 5 histórias antes de dormir.",
    emoji: "🌙",
    progress: 5,
    goal: 5,
    gradient: "from-indigo-400 to-purple-600",
  },
];

export type Collectible = {
  id: string;
  name: string;
  emoji: string;
  unlocked: boolean;
  gradient: string;
};

export const collectibles: Collectible[] = [
  {
    id: "estrela",
    name: "Estrela Dourada",
    emoji: "⭐",
    unlocked: true,
    gradient: "from-yellow-200 to-amber-400",
  },
  {
    id: "urso",
    name: "Urso de Pelúcia",
    emoji: "🧸",
    unlocked: true,
    gradient: "from-orange-200 to-amber-500",
  },
  {
    id: "raposa",
    name: "Raposa Amiga",
    emoji: "🦊",
    unlocked: true,
    gradient: "from-orange-300 to-red-400",
  },
  {
    id: "varinha",
    name: "Varinha Mágica",
    emoji: "🪄",
    unlocked: false,
    gradient: "from-fuchsia-300 to-violet-500",
  },
  {
    id: "trofeu",
    name: "Troféu de Ouro",
    emoji: "🏆",
    unlocked: false,
    gradient: "from-yellow-300 to-orange-500",
  },
  {
    id: "livro",
    name: "Livro Encantado",
    emoji: "📖",
    unlocked: false,
    gradient: "from-sky-300 to-indigo-500",
  },
  {
    id: "coroa",
    name: "Coroa Real",
    emoji: "👑",
    unlocked: false,
    gradient: "from-amber-200 to-yellow-500",
  },
  {
    id: "unicornio",
    name: "Unicórnio",
    emoji: "🦄",
    unlocked: false,
    gradient: "from-pink-300 to-purple-400",
  },
];
