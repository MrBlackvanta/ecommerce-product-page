import { product } from "@/data";
import { discountPercent, formatPrice } from "@/lib";
import AddToCart from "./add-to-cart";

export default function ProductDetails() {
  const { id, company, name, description, price, originalPrice } = product;

  return (
    <div className="px-6 md:px-0 lg:col-start-2">
      <p className="text-eyebrow-sm text-muted uppercase md:text-eyebrow">
        {company}
      </p>
      <h1 className="mt-4 text-heading md:mt-6 md:text-display">{name}</h1>
      <p className="mt-4 text-body-sm text-muted md:mt-6 md:text-body lg:mt-8">
        {description}
      </p>

      <div className="mt-8 grid grid-cols-[auto_auto_1fr] items-start justify-items-start gap-x-4 md:mt-6 md:grid-cols-[auto_1fr] md:gap-x-6 md:gap-y-2 lg:mt-8">
        <p className="text-heading">
          <span className="sr-only">Price: </span>
          {formatPrice(price)}
        </p>
        <p className="rounded-md bg-ink px-2.5 text-body/6.75 font-bold text-white">
          {discountPercent(price, originalPrice)}%
          <span className="sr-only"> off</span>
        </p>
        <p className="justify-self-end text-body font-bold text-muted line-through md:justify-self-start">
          <span className="sr-only">Original price: </span>
          {formatPrice(originalPrice)}
        </p>
      </div>

      <AddToCart productId={id} productName={name} />
    </div>
  );
}
