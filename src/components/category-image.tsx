import { useState } from "react";
import type { Category } from "@/lib/stories";
import { cn } from "@/lib/utils";

type CategoryImageProps = {
  category: Category;
  className?: string;
  placeholderClassName?: string;
};

export function CategoryImage({
  category,
  className,
  placeholderClassName,
}: CategoryImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={`${category.name} indisponivel`}
        className={cn(
          "w-14 h-14 rounded-full bg-white/25 flex items-center justify-center text-lg font-bold text-white/95",
          placeholderClassName,
        )}
      >
        {category.name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={category.image}
      alt={category.name}
      className={cn("w-14 h-14 object-contain", className)}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
