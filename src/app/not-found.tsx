import { product, SITE_NAME } from "@/data";
import type { Metadata } from "next";
import Link from "next/link";

const description = `Nothing is stocked at this address, but the ${product.name} are still half price.`;

export const metadata: Metadata = {
  title: `${SITE_NAME} | Page not found`,
  description,
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="grid min-h-[60dvh] place-content-center justify-items-center px-6 pb-12 text-center">
      <p className="text-eyebrow-sm text-muted uppercase md:text-eyebrow">
        Error 404
      </p>
      <h1 className="mt-4 text-heading md:mt-6 md:text-display">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-body-sm text-balance text-muted md:mt-6 md:text-body">
        {description}
      </p>
      <Link
        href="/"
        className="mt-8 flex h-14 w-full max-w-68 items-center justify-center rounded-card bg-accent text-body font-bold shadow-cta v-focus hover:bg-accent-hover motion-safe:transition-[background-color]"
      >
        Back to the sneakers
      </Link>
    </main>
  );
}
