import * as cart from './1.cart';

describe('cart', () => {
  describe('.calculateTotalPrice', () => {
    it('should return 0 for empty cart', () => {
      const products: cart.Product[] = [];
      const result = cart.calculateTotalPrice(products);
      expect(result).toBe(0);
    });

    it('should return the price of a single product', () => {
      const products: cart.Product[] = [
        { product_id: 1, price: 100, quantity: 1 },
      ];
      const result = cart.calculateTotalPrice(products);
      expect(result).toBe(100);
    });

    it('should return the total price for multiple products', () => {
      const products: cart.Product[] = [
        { product_id: 1, price: 100, quantity: 1 },
        { product_id: 2, price: 200, quantity: 2 },
      ];
      const result = cart.calculateTotalPrice(products);
      expect(result).toBe(500);
    });

    it('should handle large quantities', () => {
      const products: cart.Product[] = [
        { product_id: 1, price: 100, quantity: 1000 },
        { product_id: 2, price: 200, quantity: 2000 },
      ];
      const result = cart.calculateTotalPrice(products);
      expect(result).toBe(500000);
    });

    it('should handle large prices', () => {
      const products: cart.Product[] = [
        { product_id: 1, price: 1000000, quantity: 1 },
        { product_id: 2, price: 2000000, quantity: 2 },
      ];
      const result = cart.calculateTotalPrice(products);
      expect(result).toBe(5000000);
    });

    it('should handle large quantities and prices', () => {
      const products: cart.Product[] = [
        { product_id: 1, price: 1000000, quantity: 1000 },
        { product_id: 2, price: 2000000, quantity: 2000 },
      ];
      const result = cart.calculateTotalPrice(products);
      expect(result).toBe(5000000000);
    });

    it('should handle negative quantities', () => {
      const products: cart.Product[] = [
        { product_id: 1, price: 100, quantity: -1 },
        { product_id: 2, price: 200, quantity: 2 },
      ];
      const result = cart.calculateTotalPrice(products);
      expect(result).toBe(400);
    });

    it('should handle negative prices', () => {
      const products: cart.Product[] = [
        { product_id: 1, price: -100, quantity: 1 },
        { product_id: 2, price: 200, quantity: 2 },
      ];
      const result = cart.calculateTotalPrice(products);
      expect(result).toBe(400);
    });

    it('should handle negative prices and quantities', () => {
      const products: cart.Product[] = [
        { product_id: 1, price: -100, quantity: -1 },
        { product_id: 2, price: -200, quantity: -2 },
      ];
      const result = cart.calculateTotalPrice(products);
      expect(result).toBe(0);
    });

    it('should handle zero prices and quantities', () => {
      const products: cart.Product[] = [
        { product_id: 1, price: 0, quantity: 0 },
        { product_id: 2, price: 0, quantity: 0 },
      ];
      const result = cart.calculateTotalPrice(products);
      expect(result).toBe(0);
    });
  })
});