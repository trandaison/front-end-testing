import { describe, it, expect } from 'vitest';
import { calculateDiscount } from '../6.discount';

// Write test case for calculateDiscount with cases:
// 1. price is 0
// 2. price is 1000000, customerClass is VIP, discountVoucherCode is WELCOME10
// 3. price is 1000000, customerClass is VIP, discountVoucherCode is BLACKFRIDAY
// 4. price is 1000000, customerClass is VIP
// 5. price is 1000000, customerClass is PREMIUM
// 6. price is 1000000, customerClass is NORMAL
// 7. price is 1000000, discountVoucherCode is WELCOME10
// 8. price is 1000000, discountVoucherCode is BLACKFRIDAY
// 9. price is 1000000
// 10. price is 2000000
// 11. price is 2000000, customerClass is PREMIUM
// 12. price is 2000000, customerClass is NORMAL
// 13. price is 2000000, customerClass is VIP
// 14. price is 2000000, customerClass is VIP, discountVoucherCode is WELCOME10
// 15. price is 2000000, customerClass is VIP, discountVoucherCode is BLACKFRIDAY
// 16. price is 2000000, discountVoucherCode is WELCOME10
// 17. price is 2000000, discountVoucherCode is BLACKFRIDAY

describe('calculateDiscount', () => {
  it('should return 0 when price is 0', () => {
    expect(calculateDiscount(0)).toBe(0);
  });

  it('should calculate discount for VIP customer with WELCOME10 voucher', () => {
    expect(calculateDiscount(1000000, { customerClass: 'VIP', discountVoucherCode: 'WELCOME10' })).toBe(200000);
  });

  it('should calculate discount for VIP customer with BLACKFRIDAY voucher', () => {
    expect(calculateDiscount(1000000, { customerClass: 'VIP', discountVoucherCode: 'BLACKFRIDAY' })).toBe(400000);
  });

  it('should calculate discount for VIP customer without voucher', () => {
    expect(calculateDiscount(1000000, { customerClass: 'VIP' })).toBe(100000);
  });

  it('should calculate discount for PREMIUM customer without voucher', () => {
    expect(calculateDiscount(1000000, { customerClass: 'PREMIUM' })).toBe(50000);
  });

  it('should calculate discount for NORMAL customer without voucher', () => {
    expect(calculateDiscount(1000000, { customerClass: 'NORMAL' })).toBe(0);
  });

  it('should calculate discount for WELCOME10 voucher without customer class', () => {
    expect(calculateDiscount(1000000, { discountVoucherCode: 'WELCOME10' })).toBe(100000);
  });

  it('should calculate discount for BLACKFRIDAY voucher without customer class', () => {
    expect(calculateDiscount(1000000, { discountVoucherCode: 'BLACKFRIDAY' })).toBe(300000);
  });

  it('should calculate discount for price without customer class or voucher', () => {
    expect(calculateDiscount(1000000)).toBe(0);
  });

  it('should calculate discount for price 2000000 without customer class or voucher', () => {
    expect(calculateDiscount(2000000)).toBe(100000);
  });

  it('should calculate discount for PREMIUM customer with price 2000000', () => {
    expect(calculateDiscount(2000000, { customerClass: 'PREMIUM' })).toBe(200000);
  });

  it('should calculate discount for NORMAL customer with price 2000000', () => {
    expect(calculateDiscount(2000000, { customerClass: 'NORMAL' })).toBe(100000);
  });

  it('should calculate discount for VIP customer with price 2000000', () => {
    expect(calculateDiscount(2000000, { customerClass: 'VIP' })).toBe(300000);
  });

  it('should calculate discount for VIP customer with WELCOME10 voucher and price 2000000', () => {
    expect(calculateDiscount(2000000, { customerClass: 'VIP', discountVoucherCode: 'WELCOME10' })).toBe(400000);
  });

  it('should calculate discount for VIP customer with BLACKFRIDAY voucher and price 2000000', () => {
    expect(calculateDiscount(2000000, { customerClass: 'VIP', discountVoucherCode: 'BLACKFRIDAY' })).toBe(800000);
  });

  it('should calculate discount for WELCOME10 voucher with price 2000000 without customer class', () => {
    expect(calculateDiscount(2000000, { discountVoucherCode: 'WELCOME10' })).toBe(200000);
  });

  it('should calculate discount for BLACKFRIDAY voucher with price 2000000 without customer class', () => {
    expect(calculateDiscount(2000000, { discountVoucherCode: 'BLACKFRIDAY' })).toBe(600000);
  });
});
