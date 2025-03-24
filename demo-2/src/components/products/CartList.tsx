import { useCartStore } from "@/stores/cart";
import { Modal } from "../Modal";

export function CartList(props: { onCheckout?: () => void }) {
  const cartStore = useCartStore();
  const { items } = cartStore;

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <Modal title="Shopping Cart" onClose={cartStore.toggleVisible}>
      {items.length > 0 && <>
        <ul className="mt-4 overflow-y-auto max-h-96 no-scrollbar">
          {items.map((item) => (<li key={item.product.id} className="flex justify-between items-center border-b border-gray-200 py-2">
            <div className="flex items-center">
              <img
                src={item.product.image}
                alt="Product"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h3 className="text-gray-800 font-bold">{item.product.title}</h3>
                <p className="text-gray-500">${item.product.price}</p>
              </div>
            </div>
            <span className="text-gray-800 font-bold">{item.quantity}</span>
          </li>))}
        </ul>
        <div className="mt-4 flex justify-between items-center">
          <h3 className="text-gray-800 font-bold">Total</h3>
          <span className="text-gray-800 font-bold">${total.toLocaleString()}</span>
          </div>
        <button
          className="w-full bg-gray-800 text-white rounded-md px-4 py-2 mt-4 transition duration-300 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
          onClick={() => {
            cartStore.toggleVisible();
            props.onCheckout && props.onCheckout();
          }}
        >
          Checkout
        </button>
      </>}
      {items.length === 0 && <>
        <p className="text-gray-800 my-8 text-center">Cart is empty!</p>
        <button
          className="w-full bg-gray-800 text-white rounded-md px-4 py-2 mt-4 transition duration-300 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
          onClick={cartStore.toggleVisible}
        >
          Close
        </button>
      </>}
    </Modal>
  );
}
