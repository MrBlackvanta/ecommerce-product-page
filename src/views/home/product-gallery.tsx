"use client";

import { product } from "@/data";
import { useState } from "react";
import GalleryArrow from "./gallery-arrow";
import GalleryThumbnails from "./gallery-thumbnails";
import Lightbox from "./lightbox";
import {
  PAGE_PHOTO_SIZES,
  photoSrcSet,
  usePhotoIndex,
} from "./use-photo-index";

export default function ProductGallery() {
  const { photos } = product;
  const { index, select, step } = usePhotoIndex();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const photo = photos[index];

  return (
    <>
      <section aria-roledescription="carousel" aria-label="Product photos">
        <div aria-live="polite" className="relative">
          <figure
            key={index}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${photos.length}`}
          >
            <img
              src={photo.large.src}
              srcSet={photoSrcSet(photo)}
              sizes={PAGE_PHOTO_SIZES}
              alt={photo.alt}
              width={448}
              height={445}
              fetchPriority="high"
              className="h-75 w-full object-cover md:h-72.5 md:rounded-photo lg:aspect-448/445 lg:h-auto"
            />
          </figure>
          <GalleryArrow
            direction="previous"
            size="page"
            onClick={() => step(-1)}
            className="absolute top-1/2 left-4 -translate-y-1/2 md:left-3 lg:hidden"
          />
          <GalleryArrow
            direction="next"
            size="page"
            onClick={() => step(1)}
            className="absolute top-1/2 right-4 -translate-y-1/2 md:right-3 lg:hidden"
          />
          <button
            type="button"
            aria-label="Enlarge photo"
            aria-haspopup="dialog"
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 hidden rounded-photo v-focus lg:block"
          />
        </div>

        <GalleryThumbnails
          index={index}
          onSelect={select}
          className="mt-8 hidden lg:grid"
        />
      </section>

      <Lightbox
        open={lightboxOpen}
        index={index}
        onClose={() => setLightboxOpen(false)}
        onStep={step}
        onSelect={select}
      />
    </>
  );
}
