import { product, type ProductPhoto } from "@/data";
import { useEffect, useRef, useState } from "react";
import { crossFade } from "./cross-fade";

export const PAGE_PHOTO_SIZES =
  "(min-width: 64rem) 28rem, (min-width: 48rem) calc(100vw - 10rem), 100vw";

export function photoSrcSet({ small, large }: ProductPhoto) {
  return `${small.src} ${small.width}w, ${large.src} ${large.width}w`;
}

async function decode(photo: ProductPhoto) {
  const image = new Image();
  image.sizes = PAGE_PHOTO_SIZES;
  image.srcset = photoSrcSet(photo);
  image.src = photo.large.src;
  await image.decode().catch(() => undefined);
}

function warmPhotos() {
  for (const photo of product.photos) void decode(photo);
}

export function usePhotoIndex() {
  const { photos } = product;
  const [index, setIndex] = useState(0);
  const target = useRef(0);

  useEffect(() => {
    if (document.readyState === "complete") {
      warmPhotos();
      return;
    }

    window.addEventListener("load", warmPhotos, { once: true });
    return () => window.removeEventListener("load", warmPhotos);
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
