import { navLinks } from "@/data";
import Link from "next/link";

type NavLinksVariant = "header" | "menu";

const variants: Record<
  NavLinksVariant,
  { nav: string; list: string; link: string }
> = {
  header: {
    nav: "ml-14 hidden self-stretch lg:block",
    list: "flex h-full gap-8",
    link: "relative flex h-full items-center text-body-sm text-muted after:absolute after:inset-x-0 after:-bottom-8.25 after:h-1 hover:text-ink hover:after:bg-accent focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-transparent focus-visible:after:bg-ink motion-safe:transition-[color] motion-safe:after:transition-[background-color]",
  },
  menu: {
    nav: "mt-13.5",
    list: "flex flex-col gap-6",
    link: "block text-menu text-ink v-focus",
  },
};

type NavLinksProps = {
  variant: NavLinksVariant;
  onNavigate?: () => void;
};

export default function NavLinks({ variant, onNavigate }: NavLinksProps) {
  const { nav, list, link } = variants[variant];

  return (
    <nav aria-label="Primary" className={nav}>
      <ul className={list}>
        {navLinks.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              prefetch={false}
              onClick={onNavigate}
              className={link}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
