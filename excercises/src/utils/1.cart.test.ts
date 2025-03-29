import { calculateTotalPrice, Product } from "./1.cart";

describe('cart', () => {
  
  describe('.calculateTotalPrice', () => {
    it('Should return 0 when the product list is empty', () => {
      const products: Product[] = [];
      expect(calculateTotalPrice(products)).toBe(0);
    });
    
    it('Should return correct total price for one product', () => {
      const products: Product[] = [{ product_id: 1, price: 10, quantity: 1 }];
      expect(calculateTotalPrice(products)).toBe(10);
    });

    it('Should return correct total price for multiple products', () => {
      const products: Product[] = [
        { product_id: 1, price: 10, quantity: 1 },
        { product_id: 2, price: 5, quantity: 2 },
      ];
      expect(calculateTotalPrice(products)).toBe(20);
    });

    it('Should return 0 when product quantity is negative', () => {
      const products: Product[] = [{ product_id: 1, price: 10, quantity: -1 }];
      expect(calculateTotalPrice(products)).toBe(0);
    });

    it('Should return 0 when product price is zero', () => {
      const products: Product[] = [{ product_id: 1, price: 0, quantity: 10 }];
      expect(calculateTotalPrice(products)).toBe(0);
    });

    it('Should return 0 when product quantity and price are zero', () => {
      const products: Product[] = [{ product_id: 1, price: 0, quantity: 0 }];
      expect(calculateTotalPrice(products)).toBe(0);
    });
    
  })
})