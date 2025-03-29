import { describe, it, expect } from 'vitest';
import { calculateDiscount } from './6.discount';

describe('calculateDiscount', () => {
  it('should return 0 for negative or zero price', () => {
    expect(calculateDiscount(0)).toBeCloseTo(0);
    expect(calculateDiscount(-100)).toBeCloseTo(0);
  });

  it('should apply correct discount for VIP customers', () => {
    expect(calculateDiscount(1000, { customerClass: 'VIP' })).toBeCloseTo(100); // 10% of 1000
    expect(calculateDiscount(2000, { customerClass: 'VIP' })).toBeCloseTo(200); // 10% of 2000
  });

  it('should apply correct discount for PREMIUM customers', () => {
    expect(calculateDiscount(1000, { customerClass: 'PREMIUM' })).toBeCloseTo(50); // 5% of 1000
    expect(calculateDiscount(2000, { customerClass: 'PREMIUM' })).toBeCloseTo(100); // 5% of 2000
  });

  it('should apply no discount for NORMAL customers', () => {
    expect(calculateDiscount(1000, { customerClass: 'NORMAL' })).toBeCloseTo(0); // 0% of 1000
  });

  it('should apply WELCOME10 voucher discount correctly', () => {
    expect(calculateDiscount(1000, { discountVoucherCode: 'WELCOME10' })).toBeCloseTo(100); // 10% of 1000
    expect(calculateDiscount(1000, { customerClass: 'VIP', discountVoucherCode: 'WELCOME10' })).toBeCloseTo(200); // 20% of 1000
  });

  it('should apply BLACKFRIDAY voucher discount correctly', () => {
    expect(calculateDiscount(1000, { discountVoucherCode: 'BLACKFRIDAY' })).toBeCloseTo(300); // 30% of 1000
    expect(calculateDiscount(1000, { customerClass: 'PREMIUM', discountVoucherCode: 'BLACKFRIDAY' })).toBeCloseTo(350); // 35% of 1000
  });

  it('should apply 5% discount for orders over 2 million without voucher', () => {
    expect(calculateDiscount(3000000)).toBeCloseTo(150000); // 5% of 3000000
    expect(calculateDiscount(1000000)).toBeCloseTo(0); // No discount for orders under 2 million
  });

  it('should combine customer class discount with large order discount', () => {
    expect(calculateDiscount(3000000, { customerClass: 'VIP' })).toBeCloseTo(450000); // 15% of 3000000
    expect(calculateDiscount(3000000, { customerClass: 'PREMIUM' })).toBeCloseTo(300000); // 10% of 3000000
  });

  it('should not apply large order discount when voucher is used', () => {
    expect(calculateDiscount(3000000, { discountVoucherCode: 'WELCOME10' })).toBeCloseTo(300000); // 10% of 3000000
    expect(calculateDiscount(3000000, { discountVoucherCode: 'BLACKFRIDAY' })).toBeCloseTo(900000); // 30% of 3000000
  });

  it('should handle edge case: price equal to 2M without voucher', () => {
    expect(calculateDiscount(2000000)).toBeCloseTo(0);
  });

  it('should handle edge case: price just above 2M without voucher', () => {
    expect(calculateDiscount(2000001)).toBeCloseTo(100000.05);
  });
});
