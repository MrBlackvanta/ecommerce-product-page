import photo1Small from "@/assets/image-product-1-550.webp";
import thumbnail1 from "@/assets/image-product-1-thumbnail.webp";
import photo1 from "@/assets/image-product-1.webp";
import photo2Small from "@/assets/image-product-2-550.webp";
import thumbnail2 from "@/assets/image-product-2-thumbnail.webp";
import photo2 from "@/assets/image-product-2.webp";
import photo3Small from "@/assets/image-product-3-550.webp";
import thumbnail3 from "@/assets/image-product-3-thumbnail.webp";
import photo3 from "@/assets/image-product-3.webp";
import photo4Small from "@/assets/image-product-4-550.webp";
import thumbnail4 from "@/assets/image-product-4-thumbnail.webp";
import photo4 from "@/assets/image-product-4.webp";

export const product = {
  id: "fall-limited-edition-sneakers",
  company: "Sneaker Company",
  name: "Fall Limited Edition Sneakers",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  price: 125,
  originalPrice: 250,
  photos: [
    {
      large: photo1,
      small: photo1Small,
      thumbnail: thumbnail1,
      alt: "The pair on an orange backdrop, one sneaker tipped up to show its sole",
    },
    {
      large: photo2,
      small: photo2Small,
      thumbnail: thumbnail2,
      alt: "The pair resting on smooth stones beside a dry branch",
    },
    {
      large: photo3,
      small: photo3Small,
      thumbnail: thumbnail3,
      alt: "One sneaker balanced on two stones against a curled orange sheet",
    },
    {
      large: photo4,
      small: photo4Small,
      thumbnail: thumbnail4,
      alt: "One sneaker in profile on a stack of stones",
    },
  ],
};

export type ProductPhoto = (typeof product.photos)[number];

export function findProduct(id: string) {
  return id === product.id ? product : undefined;
}
