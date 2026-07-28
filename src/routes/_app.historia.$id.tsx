import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Heart, Play, Volume2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { LunoMascot } from "@/components/luno-mascot";
import { SectionHeading } from "@/components/section-heading";
import { StoryArt } from "@/components/story-art";
import { StoryCard } from "@/components/story-card";
import { useStoryPagesQuery, useStoriesQuery } from "@/hooks/use-content";
import { getStoryImage } from "@/lib/story-images";
import { useUserState } from "@/lib/user-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/historia/$id")({
  component: StoryPage,
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <p className="font-display text-xl">Ops! História não encontrada.</p>
      <Link to="/biblioteca" className="text-primary underline">
        Voltar para a biblioteca
      </Link>
    </div>
  ),
});

function StoryPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { state, toggleFavorite, setCurrent, markCompleted } = useUserState();
  const storiesQuery = useStoriesQuery();
  const storyPagesQuery = useStoryPagesQuery(id);
  const [reading, setReading] = useState(false);
  const [page, setPage] = useState(() =>
    state.currentStory?.id === id ? state.currentStory.page : 0,
  );
  const [celebrate, setCelebrate] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [audioNoticeVisible, setAudioNoticeVisible] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 640 : false,
  );

  const stories = storiesQuery.data ?? [];
  const storyBase = stories.find((item) => item.id === id);
  const storyPages = storyPagesQuery.data ?? [];
  const story = useMemo(() => {
    if (!storyBase) return undefined;

    return {
      ...storyBase,
      pages: storyPages.map((item) => item.text),
      pageCount: storyPages.length || storyBase.pageCount,
    };
  }, [storyBase, storyPages]);

  useEffect(() => {
    if (!story) return;
    if (reading) {
      const persistedPage = isDesktopView
        ? Math.min(page, Math.max(story.pages.length - 1, 0))
        : page - (page % 2);
      setCurrent(id, persistedPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reading, page, id, isDesktopView, story?.pages.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewport = () => setIsDesktopView(window.innerWidth >= 640);
    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!reading) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [reading]);

  if (storiesQuery.isLoading || !storyBase) {
    if (storiesQuery.isLoading) {
      return (
        <div className="space-y-5 overflow-x-hidden pb-10 pt-0">
          <div className="aspect-[4/3] rounded-3xl bg-white/80 shadow-pop animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 rounded-2xl bg-white/80 shadow-card animate-pulse" />
            <div className="h-20 rounded-2xl bg-white/80 shadow-card animate-pulse" />
          </div>
        </div>
      );
    }

    return (
      <div className="p-10 text-center">
        <p className="font-display text-xl">Ops! História não encontrada.</p>
        <Link to="/biblioteca" className="text-primary underline">
          Voltar para a biblioteca
        </Link>
      </div>
    );
  }

  const hasLoadedPages = storyPagesQuery.isSuccess;
  const hasImage = Boolean(getStoryImage(story));
  const isFav = state.favorites.includes(story.id);
  const idx = stories.findIndex((item) => item.id === story.id);
  const prev = stories[(idx - 1 + stories.length) % stories.length];
  const next = stories[(idx + 1) % stories.length];
  const favoriteStories = stories.filter((item) => state.favorites.includes(item.id));
  const mobileReadingStories = favoriteStories.length > 0 ? favoriteStories.slice(0, 4) : [story];
  const storyPagesText = story.pages.length > 0 ? story.pages : [""];
  const spreadStart = page - (page % 2);
  const primaryPage = storyPagesText[spreadStart] ?? "";
  const secondaryPage = storyPagesText[spreadStart + 1] ?? "";
  const shouldShowMobileSecondaryPage = Boolean(
    secondaryPage && secondaryPage !== primaryPage,
  );
  const spreadCount = Math.max(Math.ceil(storyPagesText.length / 2), 1);
  const spreadNumber = Math.floor(spreadStart / 2) + 1;
  const desktopPages = [...storyPagesText];

  if (desktopPages.length % 2 === 0) {
    desktopPages.push("", "__END__");
  } else {
    desktopPages.push("__END__");
  }

  const desktopSpreadStart = page - (page % 2);
  const desktopPrimaryPage = desktopPages[desktopSpreadStart] ?? "";
  const desktopSecondaryPage = desktopPages[desktopSpreadStart + 1] ?? "";
  const desktopSpreadCount = Math.max(Math.ceil(desktopPages.length / 2), 1);
  const desktopSpreadNumber = Math.floor(desktopSpreadStart / 2) + 1;
  const hasNextReadingStep = isDesktopView
    ? desktopSpreadStart + 2 < desktopPages.length
    : spreadStart + 2 < storyPagesText.length;
  const progressWidth = isDesktopView
    ? (desktopSpreadNumber / desktopSpreadCount) * 100
    : (spreadNumber / spreadCount) * 100;
  const currentPage = isDesktopView ? desktopPrimaryPage : storyPagesText[spreadStart] ?? "";
  const nextPagePreview = isDesktopView ? desktopSecondaryPage : storyPagesText[spreadStart + 1];

  const advance = () => {
    if (isFlipping || !hasLoadedPages) return;
    const nextPage = isDesktopView ? desktopSpreadStart + 2 : spreadStart + 2;

    if (hasNextReadingStep) {
      setIsFlipping(true);
      window.setTimeout(() => {
        setPage(nextPage);
        setIsFlipping(false);
      }, 180);
      return;
    }

    setIsFlipping(true);
    window.setTimeout(() => {
      markCompleted(story.id);
      setCurrent(story.id, 0);
      setPage(0);
      setReading(false);
      setCelebrate(true);
      setIsFlipping(false);
    }, 220);
  };

  const retreat = () => {
    const previousPage = isDesktopView ? desktopSpreadStart - 2 : spreadStart - 2;
    if ((isDesktopView ? desktopSpreadStart === 0 : spreadStart === 0) || isFlipping) return;

    setIsFlipping(true);
    window.setTimeout(() => {
      setPage(Math.max(0, previousPage));
      setIsFlipping(false);
    }, 180);
  };

  const handleAudioSoon = () => {
    setAudioNoticeVisible(true);
    window.setTimeout(() => {
      setAudioNoticeVisible(false);
    }, 2200);
  };

  return (
    <div
      className={cn(
        "space-y-5 overflow-x-hidden pb-10",
        !reading && "pt-0",
        reading && "mx-auto max-w-6xl",
      )}
    >
      {!reading && (
        <div className={cn("relative overflow-hidden rounded-3xl bg-gradient-to-br shadow-pop", story.gradient)}>
          <div className="relative flex aspect-[4/3] items-center justify-center">
            <StoryArt
              story={story}
              imageClassName={cn(
                "h-full w-full",
                hasImage ? "object-cover scale-[1.06] sm:scale-[1.03]" : "object-contain p-4",
              )}
              fallbackClassName="h-full w-full"
              emojiClassName="text-[8rem] drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/85 sm:text-xs">
                {story.minutes} min · {story.author}
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold leading-tight sm:text-3xl">
                {story.title}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-white/90">{story.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setReading(true)}
                  disabled={storyPagesQuery.isLoading || storyPagesQuery.isError}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-sun font-display font-bold text-white shadow-card transition hover:scale-[1.02] disabled:opacity-60"
                >
                  <Play className="h-5 w-5" /> Ler
                </button>
                <button
                  onClick={handleAudioSoon}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white/92 font-display font-bold text-primary shadow-card"
                >
                  <Volume2 className="h-5 w-5" /> Ouvir
                </button>
              </div>
              {audioNoticeVisible && (
                <div className="mt-3 rounded-2xl bg-black/35 px-4 py-3 text-sm text-white/95 backdrop-blur-sm">
                  Narração em breve! 🎧
                </div>
              )}
              {storyPagesQuery.isError && (
                <div className="mt-3 rounded-2xl bg-black/35 px-4 py-3 text-sm text-white/95 backdrop-blur-sm">
                  Não foi possível carregar as páginas desta história agora.
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => toggleFavorite(story.id)}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-card"
            aria-label="Favoritar"
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isFav ? "fill-rose-500 text-rose-500" : "text-slate-500",
              )}
            />
          </button>
          <Link
            to="/biblioteca"
            className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-card"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
        </div>
      )}

      {reading && (
        <div className="fixed inset-0 z-50 min-h-dvh overflow-hidden bg-[radial-gradient(circle_at_top,_rgb(255,248,230),_rgb(244,233,205)_55%,_rgb(227,214,180)_100%)] px-2 py-3 sm:px-6 sm:py-6">
          <div className="mx-auto flex h-full max-w-6xl flex-col gap-3 sm:gap-4">
            <div className="h-1.5 overflow-hidden rounded-full bg-amber-100/80">
              <div
                className="h-full bg-gradient-sun transition-all"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
            <div className="relative flex-1 min-h-0 pt-1 sm:px-2">
              <div
                className={cn(
                  "relative h-full overflow-hidden rounded-[2rem] border border-amber-200/70 bg-[linear-gradient(135deg,#fef7e6_0%,#fffdf7_45%,#fbf1d6_100%)] shadow-pop transition duration-200",
                  isFlipping && "scale-[0.99] opacity-95",
                )}
              >
                <div className="pointer-events-none absolute inset-y-6 left-0 w-4 bg-[repeating-linear-gradient(90deg,rgba(217,170,88,0.34)_0px,rgba(217,170,88,0.34)_1px,rgba(255,249,235,0.96)_1px,rgba(255,249,235,0.96)_3px)] opacity-95 sm:w-5" />
                <div className="pointer-events-none absolute inset-y-6 right-0 w-4 bg-[repeating-linear-gradient(90deg,rgba(217,170,88,0.34)_0px,rgba(217,170,88,0.34)_1px,rgba(255,249,235,0.96)_1px,rgba(255,249,235,0.96)_3px)] opacity-95 sm:w-5" />
                <div className="pointer-events-none absolute inset-y-4 left-3 w-px bg-gradient-to-b from-amber-200/20 via-amber-700/40 to-amber-200/20 sm:left-4" />
                <div className="pointer-events-none absolute inset-y-4 right-3 w-px bg-gradient-to-b from-amber-200/20 via-amber-700/40 to-amber-200/20 sm:right-4" />
                <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-8 -translate-x-1/2 bg-gradient-to-r from-amber-900/10 via-amber-950/20 to-amber-900/10 sm:block" />
                <div className="grid h-full gap-0 sm:grid-cols-2">
                  <section className="relative min-h-[50vh] px-5 pb-8 pt-10 sm:min-h-0 sm:border-r sm:border-amber-200/60 sm:p-10 sm:px-6 sm:pb-8 sm:pt-12">
                    <div className="flex h-full flex-col">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-700/80">
                        Página {isDesktopView ? desktopSpreadStart + 1 : spreadNumber}
                      </span>
                      <div className="mt-4 h-px bg-gradient-to-r from-amber-300/70 to-transparent" />
                      <div className="mt-6 space-y-5 overflow-y-auto pr-1 sm:block">
                        {storyPagesQuery.isLoading ? (
                          <div className="space-y-4">
                            <div className="h-6 w-2/3 rounded-full bg-white/70 animate-pulse" />
                            <div className="h-6 w-full rounded-full bg-white/70 animate-pulse" />
                            <div className="h-6 w-5/6 rounded-full bg-white/70 animate-pulse" />
                          </div>
                        ) : (
                          <>
                            <p className="font-display text-[1.28rem] leading-9 text-slate-700 sm:text-[1.5rem] sm:leading-10">
                              <span className="sm:hidden">{primaryPage}</span>
                              <span className="hidden sm:inline">{currentPage}</span>
                            </p>
                            {!isDesktopView && shouldShowMobileSecondaryPage && (
                              <p className="pt-4 font-display text-[1.28rem] leading-9 text-slate-700">
                                {secondaryPage}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="hidden min-h-0 p-10 sm:block">
                    <div className="flex h-full flex-col">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-700/80 text-right">
                        {nextPagePreview === "__END__"
                          ? "Fim da história"
                          : nextPagePreview
                            ? `Página ${desktopSpreadStart + 2}`
                            : "Página em branco"}
                      </span>
                      <div className="mt-4 h-px bg-gradient-to-l from-amber-300/70 to-transparent" />
                      {nextPagePreview && nextPagePreview !== "__END__" ? (
                        <p className="mt-6 overflow-y-auto pl-1 font-display text-[1.5rem] leading-10 text-slate-700">
                          {nextPagePreview}
                        </p>
                      ) : nextPagePreview === "__END__" ? (
                        <div className="mt-6 flex h-full items-center justify-center rounded-[1.5rem] border border-dashed border-amber-300/80 bg-white/45 p-8 text-center">
                          <p className="font-display text-xl text-amber-700">
                            Você chegou ao fim desta aventura.
                          </p>
                        </div>
                      ) : (
                        <div className="mt-6 flex h-full rounded-[1.5rem] border border-dashed border-amber-200/70 bg-white/20 p-8" />
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setReading(false)}
                className="h-11 rounded-2xl bg-white/92 px-4 font-semibold text-foreground shadow-card"
              >
                Fechar
              </button>
              <button
                onClick={retreat}
                disabled={spreadStart === 0 || isFlipping}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white/92 px-4 font-semibold text-foreground shadow-card disabled:opacity-40"
              >
                <ArrowLeft className="h-5 w-5" />
                Página anterior
              </button>
              <button
                onClick={advance}
                disabled={isFlipping || storyPagesQuery.isLoading || storyPagesQuery.isError}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white/92 px-4 font-semibold text-foreground shadow-card disabled:opacity-60"
              >
                {hasNextReadingStep ? "Próxima página" : "Concluir 🎉"}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <section className="rounded-2xl border border-amber-200/70 bg-white/60 px-3 py-3 shadow-card backdrop-blur-sm sm:hidden">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700/80">
                  {favoriteStories.length > 0 ? "Favoritas" : "Lendo agora"}
                </p>
                <p className="text-[11px] text-slate-500">
                  Página {isDesktopView ? spreadStart + 1 : spreadNumber} de {isDesktopView ? story.pageCount || story.pages.length : spreadCount}
                </p>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {mobileReadingStories.map((readingStory) => (
                  <Link
                    key={readingStory.id}
                    to="/historia/$id"
                    params={{ id: readingStory.id }}
                    onClick={() => {
                      setReading(false);
                      setPage(0);
                      setCelebrate(false);
                    }}
                    className="flex min-w-[180px] shrink-0 items-center gap-3 rounded-2xl bg-white/90 p-2 shadow-card"
                  >
                    <div
                      className={cn(
                        "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br",
                        readingStory.gradient,
                      )}
                    >
                      <StoryArt
                        story={readingStory}
                        imageClassName="h-full w-full object-cover scale-[1.04]"
                        fallbackClassName="h-full w-full"
                        emojiClassName="text-3xl"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-700/80">
                        {readingStory.minutes} min
                      </p>
                      <p className="line-clamp-2 font-display text-sm font-semibold leading-tight text-slate-700">
                        {readingStory.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {celebrate && (
        <div className="flex items-center gap-4 rounded-3xl bg-gradient-magic p-5 text-white shadow-pop">
          <LunoMascot size={72} />
          <div>
            <h3 className="font-display text-lg font-bold">Parabéns!</h3>
            <p className="text-sm opacity-95">
              Você desbloqueou uma nova aventura! Ganhou uma estrelinha ⭐ para sua coleção.
            </p>
            <button
              onClick={() => navigate({ to: "/colecao" })}
              className="mt-3 h-10 rounded-full bg-white/95 px-4 text-sm font-semibold text-primary"
            >
              Ver coleção
            </button>
          </div>
        </div>
      )}

      {!reading && (
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/historia/$id"
            params={{ id: prev.id }}
            onClick={() => {
              setReading(false);
              setPage(0);
              setCelebrate(false);
            }}
            className="flex items-center gap-3 rounded-2xl bg-white/90 p-3 shadow-card"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[10px] font-bold uppercase text-muted-foreground">Anterior</p>
              <p className="line-clamp-1 font-display text-sm font-semibold">{prev.title}</p>
            </div>
          </Link>
          <Link
            to="/historia/$id"
            params={{ id: next.id }}
            onClick={() => {
              setReading(false);
              setPage(0);
              setCelebrate(false);
            }}
            className="flex items-center justify-end gap-3 rounded-2xl bg-white/90 p-3 text-right shadow-card"
          >
            <div>
              <p className="text-[10px] font-bold uppercase text-muted-foreground">Próxima</p>
              <p className="line-clamp-1 font-display text-sm font-semibold">{next.title}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      )}

      {!reading && (
        <section className="sm:hidden">
          <SectionHeading title="Favoritas" emoji="💛" />
          {favoriteStories.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2">
              {favoriteStories.map((favoriteStory) => (
                <StoryCard
                  key={favoriteStory.id}
                  story={favoriteStory}
                  size="sm"
                  favorite={state.favorites.includes(favoriteStory.id)}
                  onFavorite={() => toggleFavorite(favoriteStory.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white/88 p-4 shadow-card">
              <p className="font-display text-base font-semibold text-foreground">
                Suas histórias favoritas vão aparecer aqui.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Toque no coração das histórias para montar sua coleção rapidinho.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
