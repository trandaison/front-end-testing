import * as cart from './1.cart';

describe('cart', () => {
  describe('.calculateTotalPrice', () => {
    it('should return 0 for an empty cart', () => {
      const products: cart.Product[] = [];
      const total = cart.calculateTotalPrice(products);
      expect(total).toBe(0);
    });
    it('should return the price of a single product', () => {
      const products: cart.Product[] = [{ product_id: 1, price: 100, quantity: 1 }];
      const total = cart.calculateTotalPrice(products);
      expect(total).toBe(100);
    });
    it('should return the total price for multiple products', () => {
      const products: cart.Product[] = [
        { product_id: 1, price: 100, quantity: 1 },
        { product_id: 2, price: 200, quantity: 2 },
      ];
      const total = cart.calculateTotalPrice(products);
      expect(total).toBe(500);
    });
    it('should handle products with large quantities', () => {
      const products: cart.Product[] = [{ product_id: 1, price: 100, quantity: 1000 }];
      const total = cart.calculateTotalPrice(products);
      expect(total).toBe(100000);
    });
  });
});
