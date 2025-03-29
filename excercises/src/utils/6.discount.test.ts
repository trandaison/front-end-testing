import * as discount from './6.discount';

describe('discount', () => {
  describe('getCustomerClassDiscountRate', () => {
    it('should return 10% discount rate for VIP customers', () => {
      expect(discount.getCustomerClassDiscountRate('VIP')).toBe(0.1);
    });

    it('should return 5% discount rate for PREMIUM customers', () => {
      expect(discount.getCustomerClassDiscountRate('PREMIUM')).toBe(0.05);
    });

    it('should return 0% discount rate for NORMAL customers', () => {
      expect(discount.getCustomerClassDiscountRate('NORMAL')).toBe(0);
    });

    it('should return 0% discount rate for undefined customer class', () => {
      expect(discount.getCustomerClassDiscountRate(undefined)).toBe(0);
    });
  });

  describe('getVoucherDiscountRate', () => {
    it('should return 10% discount rate for WELCOME10 voucher', () => {
      expect(discount.getVoucherDiscountRate('WELCOME10')).toBe(0.1);
    });

    it('should return 30% discount rate for BLACKFRIDAY voucher', () => {
      expect(discount.getVoucherDiscountRate('BLACKFRIDAY')).toBe(0.3);
    });

    it('should return 0% discount rate for unknown vouchers', () => {
      expect(discount.getVoucherDiscountRate('INVALID')).toBe(0);
    });

    it('should return 0% discount rate for undefined voucher', () => {
      expect(discount.getVoucherDiscountRate(undefined)).toBe(0);
    });
  });

  describe('getPriceThresholdDiscountRate', () => {
    it('should return 5% discount rate for price > 2M without voucher', () => {
      expect(discount.getPriceThresholdDiscountRate(2500000, false)).toBe(0.05);
    });

    it('should return 0% discount rate for price <= 2M without voucher', () => {
      expect(discount.getPriceThresholdDiscountRate(2000000, false)).toBe(0);
      expect(discount.getPriceThresholdDiscountRate(1500000, false)).toBe(0);
    });

    it('should return 0% discount rate when voucher is applied regardless of price', () => {
      expect(discount.getPriceThresholdDiscountRate(3000000, true)).toBe(0);
      expect(discount.getPriceThresholdDiscountRate(1000000, true)).toBe(0);
    });
  });

  describe('capDiscountAmount', () => {
    it('should return the discount when discount < price', () => {
      expect(discount.capDiscountAmount(1000, 500)).toBe(500);
    });

    it('should return the price when discount > price', () => {
      expect(discount.capDiscountAmount(1000, 1500)).toBe(1000);
    });

    it('should return the price when discount equals price', () => {
      expect(discount.capDiscountAmount(1000, 1000)).toBe(1000);
    });
  });

  describe('calculateDiscount', () => {
    it('should return 0 for non-positive price', () => {
      expect(discount.calculateDiscount(0)).toBe(0);
      expect(discount.calculateDiscount(-1)).toBe(0);
      expect(discount.calculateDiscount(-100)).toBe(0);
    });

    it('should apply customer class discount rates correctly', () => {
      const price = 1000000;
      expect(discount.calculateDiscount(price, { customerClass: 'VIP' })).toBe(price * 0.1);
      expect(discount.calculateDiscount(price, { customerClass: 'PREMIUM' })).toBe(price * 0.05);
      expect(discount.calculateDiscount(price, { customerClass: 'NORMAL' })).toBe(price * 0);
      expect(discount.calculateDiscount(price, {})).toBe(price * 0);
    });

    it('should apply voucher discount rates correctly', () => {
      const price = 1000000;
      expect(discount.calculateDiscount(price, { discountVoucherCode: 'WELCOME10' })).toBe(price * 0.1);
      expect(discount.calculateDiscount(price, { discountVoucherCode: 'BLACKFRIDAY' })).toBe(price * 0.3);
      expect(discount.calculateDiscount(price, { discountVoucherCode: 'INVALID' })).toBe(price * 0);
    });

    it('should apply price threshold discount for orders > 2M without voucher', () => {
      const price = 3000000;
      expect(discount.calculateDiscount(price, {})).toBe(price * 0.05);
    });

    it('should not apply price threshold discount when voucher is used', () => {
      const price = 3000000;
      expect(discount.calculateDiscount(price, { discountVoucherCode: 'WELCOME10' })).toBe(price * 0.1);
    });

    it('should combine different types of discounts correctly', () => {
      const price = 1000000;
      // VIP (10%) + WELCOME10 (10%)
      expect(discount.calculateDiscount(price, {
        customerClass: 'VIP',
        discountVoucherCode: 'WELCOME10'
      })).toBe(price * 0.2);

      // PREMIUM (5%) + BLACKFRIDAY (30%)
      expect(discount.calculateDiscount(price, {
        customerClass: 'PREMIUM',
        discountVoucherCode: 'BLACKFRIDAY'
      })).toBe(price * 0.35);
    });

    it('should cap the total discount to not exceed the price', () => {
      const price = 100;
      // VIP (10) + BLACKFRIDAY (30) = 40, which is less than price
      expect(discount.calculateDiscount(price, {
        customerClass: 'VIP',
        discountVoucherCode: 'BLACKFRIDAY'
      })).toBe(40);

      // For a low price, total discount would be capped
      const lowPrice = 10;
      // VIP (1) + BLACKFRIDAY (3) = 4, which is less than price
      expect(discount.calculateDiscount(lowPrice, {
        customerClass: 'VIP',
        discountVoucherCode: 'BLACKFRIDAY'
      })).toBe(4);
    });
  });
});