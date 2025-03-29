import { describe, it, expect } from 'vitest';
import { calculateTotalPrice } from './1.cart';

const products = [{ product_id: 1, price: 10, quantity: 1 }, { product_id: 2, price: 3, quantity: 2 }]
const productsFail = [{ product_id: 1, price: 10, quantity: 0 }, { product_id: 2, price: 0, quantity: 2 }]

describe('calculateTotalPrice', () => {
  it('no products', () => {
    expect(calculateTotalPrice([])).toBe(0);
  });

  it('1 product', () => {
    expect(calculateTotalPrice([products[0]])).toBe(10);
  });

  it('multiple products', () => {
    expect(calculateTotalPrice(products)).toBe(16);
  });

  it('0 price', () => {
    expect(calculateTotalPrice([productsFail[1]])).toBe(0);
  });

  it('0 quantity', () => {
    expect(calculateTotalPrice([productsFail[0]])).toBe(0);
  });

  it('0 price & 0 quantity', () => {
    expect(calculateTotalPrice([productsFail[1]])).toBe(0);
  });

  it('1 price & 0 quantity', () => {
    expect(calculateTotalPrice([products[0], productsFail[1]])).toBe(10);
  });

  it('0 price & 1 quantity', () => {
    expect(calculateTotalPrice([productsFail[1], products[0]])).toBe(10);
  });
});