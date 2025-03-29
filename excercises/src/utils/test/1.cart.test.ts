import { describe, it, expect } from 'vitest';
import { calculateTotalPrice, Product } from '../1.cart';

// write test case for cart test of calculateTotalPrice
// ".calculateTotalPrice"
describe('.calculateTotalPrice', () => {
  it('should return 0 for an empty cart', () => {
    const products: Product[] = [];
    const result = calculateTotalPrice(products);
    expect(result).toBe(0);
  });

  it('should return the correct total for a cart with one product', () => {
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 2 }
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(200);
  });

  it('should return the correct total for a cart with multiple products', () => {
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 2 },
      { product_id: 2, price: 50, quantity: 3 }
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(350);
  });

  it('should handle products with large quantities correctly', () => {
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 1000 }
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(100000);
  });

  it('should return 0 if all products have a quantity of 0', () => {
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 0 },
      { product_id: 2, price: 50, quantity: 0 }
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(0);
  });

  it('should handle a mix of products with zero and non-zero quantities', () => {
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 0 },
      { product_id: 2, price: 50, quantity: 3 }
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(150);
  });
});
