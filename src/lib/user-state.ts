import { useEffect, useState } from "react";

export type UserState = {
  name: string;
  avatar: string;
  streak: number;
  minutesRead: number;
  favorites: string[];
  completed: string[];
  currentStory?: { id: string; page: number };
};

const KEY = "luno:user-state:v1";

const DEFAULT: UserState = {
  name: "João",
  avatar: "🦁",
  streak: 3,
  minutesRead: 42,
  favorites: ["raposa-estrelas", "castelo-nuvens"],
  completed: ["sementinha", "urso-lua", "rex-timido", "laboratorio-luz"],
  currentStory: { id: "raposa-estrelas", page: 1 },
};

function read(): UserState {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

function write(v: UserState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(v));
  window.dispatchEvent(new CustomEvent("luno:state"));
}

export function useUserState() {
  const [state, setState] = useState<UserState>(DEFAULT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(read());
    setReady(true);
    const handler = () => setState(read());
    window.addEventListener("luno:state", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("luno:state", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const update = (patch: Partial<UserState> | ((s: UserState) => UserState)) => {
    setState((prev) => {
      const next = typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
      write(next);
      return next;
    });
  };

  const toggleFavorite = (id: string) =>
    update((s) => ({
      ...s,
      favorites: s.favorites.includes(id) ? s.favorites.filter((x) => x !== id) : [...s.favorites, id],
    }));

  const setCurrent = (id: string, page: number) => update({ currentStory: { id, page } });

  const markCompleted = (id: string) =>
    update((s) => ({ ...s, completed: s.completed.includes(id) ? s.completed : [...s.completed, id] }));

  return { state, ready, update, toggleFavorite, setCurrent, markCompleted };
}