import { useFilter } from '@/hooks/useFilter';
import { useProducts } from '@/hooks/useProducts';
import { Filter } from '@/components/products/Filter';
import { Product } from '@/components/products/Product';
import { EmptyList } from '@/components/products/EmptyList';
import { Loading } from '@/components/Loading';
import { Cart } from "@/components/products/Cart";
import { CartList } from "@/components/products/CartList";
import { useCartStore } from "@/stores/cart";
import { Checkout } from "@/components/products/Checkout";
import { useState } from "react";

const Good = () => {
  const { products, loading } = useProducts();
  const { minRating, handleRating, filteredProducts } = useFilter(products);
  const cartStore = useCartStore();
  const { visible } = cartStore;

  const [isCheckout, setIsCheckout] = useState(false);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-10 px-4 md:px-12">
      <Filter minRating={minRating} onChangeHandler={handleRating} />
      {loading ? (
        <Loading />
      ) : filteredProducts.length ? (
        <div className="grid grid-flow-row gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-4 xl:grid-cols-6">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} addToCart={cartStore.addToCart} />
          ))}
        </div>
      ) : (
        <EmptyList text="No Products!" />
      )}
      <Cart onClick={cartStore.toggleVisible} />
      {visible && <CartList onCheckout={() => setIsCheckout(true)} />}
      {isCheckout && <Checkout />}
    </section>
  );
};

export default Good;
