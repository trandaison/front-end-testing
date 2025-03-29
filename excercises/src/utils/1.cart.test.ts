import * as Cart from './1.cart';
import { describe, it, expect } from 'vitest';

describe('Cart', () => {
  describe('.calculateTotalPrice', () => {
    it('should return 0 for an empty cart', () => {
      const products: Cart.Product[] = [];
      const total = Cart.calculateTotalPrice(products);
      expect(total).toBe(0);
    });

    it('should return the price of a single product', () => {
      const products: Cart.Product[] = [
        { product_id: 1, price: 100, quantity: 1 },
      ];
      const total = Cart.calculateTotalPrice(products);
      expect(total).toBe(100);
    });

    it('should return the total price for multiple products', () => {
      const products: Cart.Product[] = [
        { product_id: 1, price: 100, quantity: 2 },
        { product_id: 2, price: 50, quantity: 3 },
      ];
      const total = Cart.calculateTotalPrice(products);
      expect(total).toBe(350);
    });

    it('should handle large quantities', () => {
      const products: Cart.Product[] = [
        { product_id: 1, price: 100, quantity: 1000 },
        { product_id: 2, price: 50, quantity: 2000 },
      ];
      const total = Cart.calculateTotalPrice(products);
      expect(total).toBe(200000);
    });
  });
});