import { useCartStore } from "@/stores/cart";
import { useMemo } from "react";
import { Modal } from "../Modal";

export function Checkout() {
  const items = useCartStore(state => state.items);

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [items]);


  return (
    <Modal title="Checkout" onClose={useCartStore.getState().toggleVisible}>
      <form className="rounded-lg w-full">
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full py-2 px-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" className="w-full py-2 px-3 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" className="w-full py-2 px-3 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" className="w-full py-2 px-3 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <h3 className="text-gray-800 font-bold">Total</h3>
          <span className="text-gray-800 font-bold">${total.toLocaleString()}</span>
        </div>
        <button
          className="w-full bg-gray-800 text-white rounded-md px-4 py-2 mt-4 transition duration-300 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
        >
          Checkout
        </button>
      </form>
    </Modal>
  );
}
