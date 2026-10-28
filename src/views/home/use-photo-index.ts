import { product, type ProductPhoto } from "@/data";
import { useEffect, useRef, useState } from "react";
import { crossFade } from "./cross-fade";

export const PAGE_PHOTO_SIZES =
  "(min-width: 64rem) 28rem, (min-width: 48rem) calc(100vw - 10rem), 100vw";

export function photoSrcSet({ small, large }: ProductPhoto) {
  return `${small.src} ${small.width}w, ${large.src} ${large.width}w`;
}

const LARGEST_PAINT = "largest-contentful-paint";

async function decode(photo: ProductPhoto) {
  const image = new Image();
  image.sizes = PAGE_PHOTO_SIZES;
  image.srcset = photoSrcSet(photo);
  image.src = photo.large.src;
  await image.decode().catch(() => undefined);
}

function pageLoaded() {
  return new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });
}

function largestContentPainted() {
  return new Promise<void>((resolve) => {
    if (!PerformanceObserver.supportedEntryTypes.includes(LARGEST_PAINT)) {
      resolve();
      return;
    }

    const observer = new PerformanceObserver(() => {
      observer.disconnect();
      resolve();
    });
    observer.observe({ type: LARGEST_PAINT, buffered: true });
  });
}

function warmPhotos() {
  for (const photo of product.photos) void decode(photo);
}

export function usePhotoIndex() {
  const { photos } = product;
  const [index, setIndex] = useState(0);
  const target = useRef(0);

  useEffect(() => {
    let mounted = true;
    void Promise.all([pageLoaded(), largestContentPainted()]).then(() => {
      if (mounted) warmPhotos();
    });

    return () => {
      mounted = false;
    };
  }, []);

  const select = (next: number) => {
    if (next === target.current) return;

    target.current = next;
    void decode(photos[next]).then(() => {
      if (target.current === next) crossFade(() => setIndex(next));
    });
  };

  const step = (delta: number) =>
    select((target.current + delta + photos.length) % photos.length);

  return { index, select, step };
}
