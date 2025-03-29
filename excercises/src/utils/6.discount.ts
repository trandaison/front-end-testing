type CustomerClass = 'VIP' | 'PREMIUM' | 'NORMAL';

type DiscountOptions = {
  customerClass?: CustomerClass;
  discountVoucherCode?: string;
}

/**
 * Calculate discount rate based on customer class
 */
export function getCustomerClassDiscountRate(customerClass?: CustomerClass): number {
  switch (customerClass) {
    case 'VIP':
      return 0.1; // 10%
    case 'PREMIUM':
      return 0.05; // 5%
    case 'NORMAL':
    default:
      return 0; // 0%
  }
}

/**
 * Calculate discount rate based on voucher code
 */
export function getVoucherDiscountRate(voucherCode?: string): number {
  switch (voucherCode) {
    case 'WELCOME10':
      return 0.1; // 10%
    case 'BLACKFRIDAY':
      return 0.3; // 30%
    default:
      return 0;
  }
}

/**
 * Calculate discount rate based on price threshold (if no voucher is applied)
 */
export function getPriceThresholdDiscountRate(price: number, hasVoucher: boolean): number {
  if (!hasVoucher && price > 2000000) {
    return 0.05; // 5%
  }
  return 0;
}

/**
 * Cap discount amount to not exceed the price
 */
export function capDiscountAmount(price: number, discount: number): number {
  return Math.min(price, discount);
}

/**
 * Calculate total discount amount based on price and discount options
 * 
 * Rules:
 * - VIP customers get 10% discount
 * - PREMIUM customers get 5% discount
 * - NORMAL customers get 0% discount
 * - "WELCOME10" voucher adds 10% discount
 * - "BLACKFRIDAY" voucher adds 30% discount
 * - Orders above 2 million without a voucher get additional 5% discount
 * - Total discount cannot exceed the order price
 * 
 * @param price order price
 * @param discountOptions options for calculating discount
 * @returns total discount amount
 */
export function calculateDiscount(price: number, discountOptions: DiscountOptions = {}): number {
  if (price <= 0) return 0;

  const { customerClass, discountVoucherCode } = discountOptions;

  // Calculate individual discount rates
  const customerClassRate = getCustomerClassDiscountRate(customerClass);
  const voucherRate = getVoucherDiscountRate(discountVoucherCode);
  const thresholdRate = getPriceThresholdDiscountRate(price, !!discountVoucherCode);

  // Calculate total discount rate and amount
  const totalRate = customerClassRate + voucherRate + thresholdRate;
  const discountAmount = price * totalRate;

  // Ensure discount doesn't exceed price
  return capDiscountAmount(price, discountAmount);
}
