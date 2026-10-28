import { ProductDetails } from "@/views/home";

export default function Home() {
  return (
    <main className="mx-auto box-content grid max-w-255.25 gap-6 pb-17.5 md:gap-12 md:px-20 md:pt-12 lg:grid-cols-[minmax(0,28rem)_minmax(0,27.8125rem)] lg:items-center lg:justify-between lg:gap-8 lg:px-12 lg:pt-24">
      <ProductDetails />
    </main>
  );
}
