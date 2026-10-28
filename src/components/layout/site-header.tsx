import avatar from "@/assets/image-avatar.webp";
import { CartIcon, Logo } from "@/components/icons";
import { SITE_NAME } from "@/data";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import NavLinks from "./nav-links";

export default function SiteHeader() {
  return (
    <header className="px-6 md:px-20 lg:px-12">
      <div className="mx-auto flex max-w-277.5 items-center pt-4.75 pb-6 md:border-b md:border-line md:pt-7 md:pb-8">
        <div className="flex items-end gap-4">
          <MobileMenu />
          <Link
            href="/"
            aria-label={`${SITE_NAME}, home`}
            className="flex v-focus"
          >
            <Logo />
          </Link>
        </div>

        <NavLinks variant="header" />

        <div className="ml-auto flex items-center gap-6 md:gap-12">
          <button
            type="button"
            aria-label="Cart"
            className="-m-2 flex p-2 text-muted v-focus hover:text-ink motion-safe:transition-[color]"
          >
            <CartIcon />
          </button>
          <Link
            href="/account"
            prefetch={false}
            className="group/avatar flex rounded-full v-focus"
          >
            <img
              src={avatar.src}
              alt="Your account"
              width={50}
              height={50}
              className="size-6 rounded-full -outline-offset-2 group-hover/avatar:outline-2 group-hover/avatar:outline-accent md:size-12.5"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
