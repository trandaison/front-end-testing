import { describe, expect, it } from 'vitest';
import type { Product } from './1.cart';
import { calculateTotalPrice } from './1.cart';

describe('calculateTotalPrice', () => {
  it('should return 0 for an empty cart', () => {
    const products: Product[] = [];
    expect(calculateTotalPrice(products)).toBe(0);
  });

  it('should return the correct total for a cart with one product', () => {
    const products: Product[] = [{ product_id: 1, price: 100, quantity: 2 }];
    expect(calculateTotalPrice(products)).toBe(200);
  });

  it('should return the correct total for multiple products', () => {
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 2 },
      { product_id: 2, price: 50, quantity: 3 },
    ];
    expect(calculateTotalPrice(products)).toBe(350);
  });

  it('should handle large quantities correctly', () => {
    const products: Product[] = [{ product_id: 1, price: 10, quantity: 1000 }];
    expect(calculateTotalPrice(products)).toBe(10000);
  });
});
