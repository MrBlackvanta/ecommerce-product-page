import { product } from "@/data";
import { installMatchMedia, setMediaMatch } from "@/test/media";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";
import ProductGallery from "./product-gallery";

const { photos } = product;
const DESKTOP = "(min-width: 64rem)";

function renderGallery() {
  const user = userEvent.setup();
  render(<ProductGallery />);
  const carousel = screen.getByRole("region", { name: "Product photos" });

  return {
    user,
    carousel,
    previous: within(carousel).getByRole("button", { name: "Previous photo" }),
    next: within(carousel).getByRole("button", { name: "Next photo" }),
  };
}

async function openLightbox() {
  installMatchMedia([DESKTOP]);
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  const gallery = renderGallery();
  await gallery.user.click(
    screen.getByRole("button", { name: "Enlarge photo" }),
  );

  return {
    ...gallery,
    lightbox: screen.getByRole("dialog", { name: "Enlarged photos" }),
  };
}

describe("ProductGallery", () => {
  it("shows the first photo as slide 1 of 4", () => {
    const { carousel } = renderGallery();

    const slide = within(carousel).getByRole("figure", { name: "1 of 4" });
    expect(within(slide).getByRole("img")).toHaveAccessibleName(photos[0].alt);
  });

  it("steps through the photos and wraps at both ends", async () => {
    const { user, carousel, previous, next } = renderGallery();

    await user.click(previous);
    expect(
      await within(carousel).findByRole("figure", { name: "4 of 4" }),
    ).toBeInTheDocument();

    await user.click(next);
    await user.click(next);
    expect(
      await within(carousel).findByRole("figure", { name: "2 of 4" }),
    ).toBeInTheDocument();
  });

  it("counts every click that lands before a photo has loaded", async () => {
    const { carousel, next } = renderGallery();

    await act(async () => {
      next.click();
      next.click();
      next.click();
    });

    expect(
      within(carousel).getByRole("figure", { name: "4 of 4" }),
    ).toBeInTheDocument();
  });

  it("picks a photo from its thumbnail and marks only that one current", async () => {
    const { user, carousel } = renderGallery();
    const thumbnails = within(carousel).getAllByRole("button", {
      name: /^Photo \d of 4$/,
    });

    await user.click(thumbnails[2]);

    expect(
      await within(carousel).findByRole("figure", { name: "3 of 4" }),
    ).toBeInTheDocument();
    expect(thumbnails.map((thumbnail) => thumbnail.ariaCurrent)).toEqual([
      null,
      null,
      "true",
      null,
    ]);
  });

  it("opens the lightbox on the same photo with focus on Close", async () => {
    const { lightbox } = await openLightbox();

    expect(lightbox).toHaveAttribute("open");
    expect(
      within(lightbox).getByRole("button", { name: "Close" }),
    ).toHaveFocus();
    expect(
      within(lightbox).getByRole("figure", { name: "1 of 4" }),
    ).toBeInTheDocument();
  });

  it("moves the page photo along with the lightbox", async () => {
    const { user, carousel, lightbox } = await openLightbox();

    await user.click(
      within(lightbox).getByRole("button", { name: "Next photo" }),
    );

    expect(
      await within(lightbox).findByRole("figure", { name: "2 of 4" }),
    ).toBeInTheDocument();
    expect(
      within(carousel).getByRole("figure", { name: "2 of 4" }),
    ).toBeInTheDocument();
  });

  it("holds the page still while open and lets it go on Close", async () => {
    const { user, lightbox } = await openLightbox();
    expect(document.body.style.position).toBe("fixed");

    await user.click(within(lightbox).getByRole("button", { name: "Close" }));

    expect(lightbox).not.toHaveAttribute("open");
    expect(document.body.style.position).toBe("");
  });

  it("closes on a backdrop click but not on a click inside", async () => {
    const { user, lightbox } = await openLightbox();

    await user.click(within(lightbox).getByRole("img"));
    expect(lightbox).toHaveAttribute("open");

    await user.click(lightbox);
    expect(lightbox).not.toHaveAttribute("open");
  });

  it("closes once the window narrows below the desktop layout", async () => {
    const { lightbox } = await openLightbox();

    act(() => setMediaMatch(DESKTOP, false));

    expect(lightbox).not.toHaveAttribute("open");
  });
});
