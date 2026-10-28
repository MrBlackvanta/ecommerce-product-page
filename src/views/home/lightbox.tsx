import { CloseIcon } from "@/components/icons";
import { product } from "@/data";
import { holdPageBehind } from "@/lib";
import { useEffect, useRef } from "react";
import GalleryArrow from "./gallery-arrow";
import GalleryThumbnails from "./gallery-thumbnails";
import { photoSrcSet } from "./use-photo-index";

type LightboxProps = {
  open: boolean;
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
  onSelect: (index: number) => void;
};

export default function Lightbox({
  open,
  index,
  onClose,
  onStep,
  onSelect,
}: LightboxProps) {
  const { photos } = product;
  const photo = photos[index];
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;

    element.showModal();
    closeButton.current?.focus();
    const release = holdPageBehind();
    const desktop = window.matchMedia("(min-width: 64rem)");
    const close = () => element.close();
    const closeOnBackdrop = (event: MouseEvent) => {
      if (event.target === element) close();
    };
    desktop.addEventListener("change", close);
    element.addEventListener("click", closeOnBackdrop);

    return () => {
      desktop.removeEventListener("change", close);
      element.removeEventListener("click", closeOnBackdrop);
      release();
      close();
    };
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-label="Enlarged photos"
      closedby="any"
      onClose={onClose}
      className="m-auto flex-col items-center overflow-visible bg-transparent [--focus-ring:var(--color-white)] backdrop:bg-black/75 open:flex motion-safe:transition-opacity motion-safe:duration-300 motion-safe:backdrop:transition-[background-color] motion-safe:backdrop:duration-300 motion-safe:starting:opacity-0 motion-safe:starting:backdrop:bg-transparent"
    >
      <button
        ref={closeButton}
        type="button"
        aria-label="Close"
        onClick={() => dialog.current?.close()}
        className="-m-2 mb-4 grid size-9 place-items-center self-end text-white v-focus hover:text-accent motion-safe:transition-[color]"
      >
        <CloseIcon className="h-auto w-5.25 shrink-0" />
      </button>

      <div aria-live="polite" className="relative">
        <figure
          key={index}
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${photos.length}`}
        >
          <img
            src={photo.large.src}
            srcSet={photoSrcSet(photo)}
            sizes="34.375rem"
            alt={photo.alt}
            width={550}
            height={550}
            loading="lazy"
            className="aspect-square w-[min(34.375rem,100dvh-13.75rem)] rounded-photo"
          />
        </figure>
        <GalleryArrow
          direction="previous"
          size="lightbox"
          onClick={() => onStep(-1)}
          className="absolute top-1/2 -left-7 -mt-9.5"
        />
        <GalleryArrow
          direction="next"
          size="lightbox"
          onClick={() => onStep(1)}
          className="absolute top-1/2 -right-7 -mt-9.5"
        />
      </div>

      <GalleryThumbnails
        index={index}
        onSelect={onSelect}
        className="mt-10 grid w-md"
      />
    </dialog>
  );
}
