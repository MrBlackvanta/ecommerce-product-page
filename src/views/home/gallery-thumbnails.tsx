import { product } from "@/data";

type GalleryThumbnailsProps = {
  index: number;
  onSelect: (index: number) => void;
  className: string;
};

export default function GalleryThumbnails({
  index,
  onSelect,
  className,
}: GalleryThumbnailsProps) {
  const { photos } = product;

  return (
    <ul className={`grid-cols-4 gap-8 ${className}`}>
      {photos.map((photo, position) => (
        <li key={photo.thumbnail.src}>
          <button
            type="button"
            aria-label={`Photo ${position + 1} of ${photos.length}`}
            aria-current={position === index || undefined}
            onClick={() => onSelect(position)}
            className="relative flex w-full rounded-card v-focus after:absolute after:inset-0 after:rounded-card hover:after:bg-white/50 aria-current:after:bg-white/75 aria-current:after:inset-ring-2 aria-current:after:inset-ring-accent motion-safe:after:transition-[background-color]"
          >
            <img
              src={photo.thumbnail.src}
              alt=""
              width={88}
              height={88}
              loading="lazy"
              className="aspect-square w-full rounded-card"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
