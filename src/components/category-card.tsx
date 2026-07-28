import { Link } from "@tanstack/react-router";
import type { Category } from "@/lib/stories";
import { cn } from "@/lib/utils";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/biblioteca"
      search={{ cat: category.id }}
      className={cn(
        "shrink-0 inline-flex min-w-[7.5rem] items-center justify-center rounded-2xl border border-sky-200/70 bg-gradient-to-br from-sky-300/95 via-blue-200/92 to-indigo-200/95 px-4 py-3 text-foreground shadow-card backdrop-blur-sm hover:-translate-y-0.5 transition",
      )}
    >
      <span className="text-center font-display font-semibold text-base leading-none">
        {category.name}
      </span>
    </Link>
  );
}
