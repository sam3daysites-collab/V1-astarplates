"use client";

import { useState } from "react";
import ImageSlot from "./ImageSlot";

interface CategoryImageCellProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  fallbackLabel: string;
}

/**
 * Category gallery cell with graceful image fallback.
 *
 * - If the `<img>` loads, the photo is shown and the manifest caption (when
 *   present) renders beneath it.
 * - If the request 404s (or any onError fires), the cell switches to the
 *   existing ImageSlot placeholder so the page never shows a broken icon.
 * - 4:3 layout is preserved in both states.
 */
export default function CategoryImageCell({
  src,
  alt,
  caption,
  width,
  height,
  fallbackLabel,
}: CategoryImageCellProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <ImageSlot
        kind="style"
        ratio="4/3"
        alt={alt}
        label={fallbackLabel}
        rounded="xl"
      />
    );
  }

  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="aspect-[4/3] w-full rounded-xl border border-neutral-200 object-cover"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-neutral-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
