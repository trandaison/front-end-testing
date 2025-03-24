import { IProduct } from '@/components/products/Product';
import { create } from 'zustand';

type CartItem = {
  product: IProduct;
  quantity: number;
}

type CartStoreState = {
  items: CartItem[];
  visible: boolean;
  toggleVisible: () => void;
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStoreState>((set) => ({
  items: [],
  visible: false,
  toggleVisible: () => set((state) => ({ visible: !state.visible })),
  addToCart: (product: IProduct) => set((state) => {
    const existingItem = state.items.find((item) => item.product.id === product.id);
    console.log('🔎 ~ addToCart: ~ existingItem:', existingItem);

    if (existingItem) {
      const items = state.items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      console.log('🔎 ~ addToCart: ~ items:', items);
      return { items };
    } else {
      return {
        items: [...state.items, { product, quantity: 1 }],
      };
    }
  }),
  removeFromCart: (productId: string) => set((state) => ({
    items: state.items.filter((item) => item.product.id !== productId),
  })),
  clearCart: () => set({ items: [] }),
}));
