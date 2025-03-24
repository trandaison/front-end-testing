import { useMemo, useState } from 'react';
import { IProduct } from "../Product";

export const useFilter = (products: IProduct[]) => {
  const [minRating, setMinRating] = useState(0);

  const handleRating = (rate: number) => setMinRating(rate)

  const filteredProducts = useMemo(
    () => filterProducts(products, minRating),
    [products, minRating]
  );

  return { minRating, handleRating, filteredProducts };
}

export function filterProducts(products: IProduct[], minRating: number) {
  return products.filter(
    ({ rating: { rate } }) => Math.floor(rate) >= minRating
  );
}
