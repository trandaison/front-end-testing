import { useCartStore } from "@/stores/cart";
import { ShoppingCart } from "../icons/ShoppingCart";
import { useMemo } from "react";

export function Cart(props: { onClick?: () => void }) {
  const items = useCartStore(state => state.items);

  const itemsCount = useMemo(() => items.length, [items]);

  return (
    <button
      className="fixed bottom-8 right-4 bg-gray-800/90 hover:bg-gray-800 text-gray-200 rounded-full p-3 shadow-lg duration-300 hover:bg-gray-900 focus:outline-none focus:shadow-outline"
      onClick={props.onClick}
    >
      <ShoppingCart className="w-8 h-8" />
      {itemsCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2">
          {itemsCount}
        </span>
      )}
    </button>
  );
}
