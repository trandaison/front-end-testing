import { describe, it, expect, vi, beforeEach } from 'vitest';
import { calculateDiscount } from './6.discount';


describe('calculateDiscount', () => {
  it('return 0', () => {
    expect(calculateDiscount(0)).toBe(0);
    expect(calculateDiscount(-1)).toBe(0);
  });

  it('return VIP 10%', () => {
    expect(calculateDiscount(100, { customerClass: 'VIP' })).toBe(10);
  });

  it('return PREMIUM 5%', () => {
    expect(calculateDiscount(100, { customerClass: 'PREMIUM' })).toBe(5);
  });

  it('return NORMAL 0%', () => {
    expect(calculateDiscount(100, { customerClass: 'NORMAL' })).toBe(0);
  });

  it('return default 0%', () => {
    expect(calculateDiscount(100)).toBe(0);
  });

  it('return WELCOME10 10%', () => {
    expect(calculateDiscount(100, { discountVoucherCode: 'WELCOME10' })).toBe(10);
  });

  it('return BLACKFRIDAY 30%', () => {
    expect(calculateDiscount(100, { discountVoucherCode: 'BLACKFRIDAY' })).toBe(30);
  });

  it('return price 2000000 5%', () => {
    expect(calculateDiscount(3000000)).toBe(150000);
  });

  it('return VIP + WELCOME10 20%', () => {
    expect(calculateDiscount(100, { customerClass: 'VIP', discountVoucherCode: 'WELCOME10' })).toBe(20);
  });

  it('return VIP + BLACKFRIDAY 40%', () => {
    expect(calculateDiscount(100, { customerClass: 'VIP', discountVoucherCode: 'BLACKFRIDAY' })).toBe(40);
  });
});
