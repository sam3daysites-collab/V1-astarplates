"use client";

import { useState } from "react";
import ImageSlot from "./ImageSlot";
import type { SiteImage } from "@/data/siteImages";

interface HeroImageProps {
  image: SiteImage | null;
}

/**
 * Homepage hero image with graceful fallback.
 *
 * - Renders the manifest hero image when present and loadable.
 * - Falls back to a clean ImageSlot placeholder if the manifest is empty or
 *   the file 404s — so the hero never shows a broken icon.
 * - Above-the-fold: eager + high fetch priority when `image.priority` is set.
 *   This is the only image on the site that should load eagerly.
 */
export default function HeroImage({ image }: HeroImageProps) {
  const [failed, setFailed] = useState(false);

  if (!image || failed) {
    return (
      <ImageSlot
        kind="hero"
        ratio="4/3"
        alt={image?.alt ?? "A Star Number Plates"}
        label="A★ Number Plates"
        priority={image?.priority}
        rounded="2xl"
      />
    );
  }

  return (
    <div className="flex aspect-[4/3] items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        decoding="async"
        loading={image.priority ? "eager" : "lazy"}
        fetchPriority={image.priority ? "high" : undefined}
        onError={() => setFailed(true)}
        className="max-h-full w-full object-contain"
      />
    </div>
  );
}
