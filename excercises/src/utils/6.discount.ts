type CustomerClass = "VIP" | "PREMIUM" | "NORMAL";

type DiscountOptions = {
  customerClass?: CustomerClass;
  discountVoucherCode?: string;
};

// Constants for discount rates
const DISCOUNT_RATES = {
  CUSTOMER_CLASS: {
    VIP: 0.1, // 10%
    PREMIUM: 0.05, // 5%
    NORMAL: 0, // 0%
  },
  VOUCHER: {
    WELCOME10: 0.1, // 10%
    BLACKFRIDAY: 0.3, // 30%
  },
  LARGE_ORDER: 0.05, // 5%
};

// Threshold for large orders (2 million VND)
const LARGE_ORDER_THRESHOLD = 2000000;

/**
 * Calculate customer class discount rate based on customer class
 * @param customerClass The class of the customer
 * @returns The discount rate for the customer class
 */
function getCustomerClassDiscountRate(customerClass?: CustomerClass): number {
  if (!customerClass) return 0;
  return DISCOUNT_RATES.CUSTOMER_CLASS[customerClass] || 0;
}

/**
 * Calculate voucher discount rate based on voucher code
 * @param voucherCode The voucher code
 * @returns The discount rate for the voucher
 */
function getVoucherDiscountRate(voucherCode?: string): number {
  if (!voucherCode) return 0;

  switch (voucherCode) {
    case "WELCOME10":
      return DISCOUNT_RATES.VOUCHER.WELCOME10;
    case "BLACKFRIDAY":
      return DISCOUNT_RATES.VOUCHER.BLACKFRIDAY;
    default:
      return 0;
  }
}

/**
 * Check if an order qualifies for large order discount
 * @param price The order price
 * @param hasVoucher Whether the order already has a voucher applied
 * @returns The large order discount rate if applicable, otherwise 0
 */
function getLargeOrderDiscountRate(price: number, hasVoucher: boolean): number {
  if (!hasVoucher && price > LARGE_ORDER_THRESHOLD) {
    return DISCOUNT_RATES.LARGE_ORDER;
  }
  return 0;
}

/**
 * Calculate the maximum allowed discount amount
 * @param price The order price
 * @param discountAmount The calculated discount amount
 * @returns The capped discount amount
 */
function capDiscountAmount(price: number, discountAmount: number): number {
  return Math.min(price, discountAmount);
}

/**
 * Calculate discount amount for an order based on various discount rules
 * @param price The original order price
 * @param discountOptions Options that affect discount calculation
 * @returns The calculated discount amount
 */
export function calculateDiscount(
  price: number,
  discountOptions: DiscountOptions = {}
): number {
  // Validate input
  if (price <= 0) return 0;

  const { customerClass, discountVoucherCode } = discountOptions;

  // Calculate individual discount components
  const customerClassDiscount = getCustomerClassDiscountRate(customerClass);
  const voucherDiscount = getVoucherDiscountRate(discountVoucherCode);
  const largeOrderDiscount = getLargeOrderDiscountRate(
    price,
    !!discountVoucherCode
  );

  // Combine all discount rates
  const totalDiscountRate =
    customerClassDiscount + voucherDiscount + largeOrderDiscount;

  // Calculate and cap the discount amount
  const discountAmount = price * totalDiscountRate;
  return capDiscountAmount(price, discountAmount);
}
