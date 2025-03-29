import { calculateDiscount } from './6.discount';

describe('calculateDiscount', () => {
  it('should return 0 if price is 0 or negative', () => {
    expect(calculateDiscount(0)).toBe(0);
    expect(calculateDiscount(-100)).toBe(0);
  });

  it('should apply correct customer class discount', () => {
    expect(calculateDiscount(1000, { customerClass: 'VIP' })).toBe(100);
    expect(calculateDiscount(1000, { customerClass: 'PREMIUM' })).toBe(50);
    expect(calculateDiscount(1000, { customerClass: 'NORMAL' })).toBe(0);
  });

  it('should apply correct voucher discount', () => {
    expect(calculateDiscount(1000, { discountVoucherCode: 'WELCOME10' })).toBe(100);
    expect(calculateDiscount(1000, { discountVoucherCode: 'BLACKFRIDAY' })).toBe(300);
  });

  it('should apply both customer and voucher discounts', () => {
    expect(calculateDiscount(1000, { customerClass: 'VIP', discountVoucherCode: 'WELCOME10' })).toBe(200);
  });

  it('should apply additional 5% discount if no voucher and price > 2M', () => {
    expect(calculateDiscount(3000000)).toBe(150000);
  });

  it('should not exceed original price', () => {
    expect(calculateDiscount(1000, { discountVoucherCode: 'BLACKFRIDAY', customerClass: 'VIP' })).toBe(400);
    expect(calculateDiscount(500, { discountVoucherCode: 'BLACKFRIDAY', customerClass: 'VIP' })).toBe(200); // Sửa mong đợi từ 500 thành 200
  });
    
  ;
});
