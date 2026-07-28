type StoryVisualConfig = {
  emoji: string;
  gradient: string;
  author: string;
  minutes: number;
  isNew?: boolean;
};

type CategoryVisualConfig = {
  image: string;
  gradient: string;
};

const defaultStoryVisual: StoryVisualConfig = {
  emoji: "📖",
  gradient: "from-sky-300 via-indigo-300 to-purple-400",
  author: "Kids Stories",
  minutes: 5,
  isNew: false,
};

const defaultCategoryVisual: CategoryVisualConfig = {
  image: "/categories/animais.png",
  gradient: "from-sky-300 to-blue-600",
};

const storyVisualsByTitle: Record<string, StoryVisualConfig> = {
  "A Raposa que Colecionava Estrelas": {
    emoji: "🦊",
    gradient: "from-orange-300 via-amber-300 to-yellow-200",
    author: "Marina Luz",
    minutes: 6,
    isNew: true,
  },
  "O Castelo Acima das Nuvens": {
    emoji: "🏰",
    gradient: "from-sky-300 via-indigo-300 to-purple-400",
    author: "Tomás Vento",
    minutes: 8,
    isNew: true,
  },
  "O Foguete de Limão": {
    emoji: "🚀",
    gradient: "from-indigo-400 via-purple-500 to-pink-500",
    author: "Sofia Cometa",
    minutes: 7,
  },
  "Rex, o Dinossauro Tímido": {
    emoji: "🦖",
    gradient: "from-lime-300 via-green-400 to-emerald-600",
    author: "Bento Rocha",
    minutes: 5,
  },
  "Capitã Pérola e o Mapa Perdido": {
    emoji: "🏴‍☠️",
    gradient: "from-amber-300 via-orange-400 to-red-500",
    author: "Lia Mar",
    minutes: 9,
  },
  "A Sementinha Curiosa": {
    emoji: "🌱",
    gradient: "from-green-300 via-emerald-400 to-teal-500",
    author: "Ana Verde",
    minutes: 4,
  },
  "O Laboratório da Luz": {
    emoji: "🔬",
    gradient: "from-sky-300 via-blue-400 to-indigo-500",
    author: "Dr. Cléo",
    minutes: 6,
    isNew: true,
  },
  "O Urso que Comeu a Lua": {
    emoji: "🐻",
    gradient: "from-yellow-200 via-amber-300 to-orange-400",
    author: "Zé Sonho",
    minutes: 5,
  },
};

const categoryVisualsByName: Record<string, CategoryVisualConfig> = {
  Animais: {
    image: "/categories/animais.png",
    gradient: "from-emerald-300 to-teal-400",
  },
  Fantasia: {
    image: "/categories/fantasia.webp",
    gradient: "from-fuchsia-300 to-violet-500",
  },
  Espaço: {
    image: "/categories/espaco.webp",
    gradient: "from-indigo-400 to-slate-700",
  },
  Dinossauros: {
    image: "/categories/dinossauros.webp",
    gradient: "from-lime-300 to-green-600",
  },
  Piratas: {
    image: "/categories/piratas.webp",
    gradient: "from-amber-300 to-red-500",
  },
  Natureza: {
    image: "/categories/natureza.webp",
    gradient: "from-green-300 to-emerald-500",
  },
  "Ciência": {
    image: "/categories/ciencia.webp",
    gradient: "from-sky-300 to-blue-600",
  },
};

export function getStoryVisualConfig(title: string): StoryVisualConfig {
  return storyVisualsByTitle[title] ?? defaultStoryVisual;
}

export function getCategoryVisualConfig(name: string): CategoryVisualConfig {
  return categoryVisualsByName[name] ?? defaultCategoryVisual;
}
