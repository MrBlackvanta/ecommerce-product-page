import { NextIcon, PreviousIcon } from "@/components/icons";

const sizes = {
  page: { button: "size-10", icon: "h-3.25 w-auto overflow-visible" },
  lightbox: { button: "size-14", icon: "" },
};

type GalleryArrowProps = {
  direction: "previous" | "next";
  size: keyof typeof sizes;
  onClick: () => void;
  className: string;
};

export default function GalleryArrow({
  direction,
  size,
  onClick,
  className,
}: GalleryArrowProps) {
  const Icon = direction === "previous" ? PreviousIcon : NextIcon;

  return (
    <button
      type="button"
      aria-label={direction === "previous" ? "Previous photo" : "Next photo"}
      onClick={onClick}
      className={`grid place-items-center rounded-full bg-white text-ink v-focus hover:text-accent motion-safe:transition-[color] ${sizes[size].button} ${className}`}
    >
      <Icon className={sizes[size].icon} />
    </button>
  );
}
