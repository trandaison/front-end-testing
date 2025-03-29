type CustomerClass = 'VIP' | 'PREMIUM' | 'NORMAL';

type DiscountOptions = {
  customerClass?: CustomerClass;
  discountVoucherCode?: string;
}

/**
 * Hàm tính toán số tiền giảm giá dựa trên giá trị đơn hàng và tỷ lệ giảm giá.
 * Đối với khách hàng VIP, giảm giá 10% trên tổng giá trị đơn hàng.
 * Đối với khách hàng PREMIUM, giảm giá 5% trên tổng giá trị đơn hàng.
 * Đối với khách hàng NORMAL, giảm giá 0% trên tổng giá trị đơn hàng.
 * Discount voucher code "WELCOME10" sẽ giảm thêm 10% trên tổng giá trị đơn hàng.
 * Discount voucher code "BLACKFRIDAY" sẽ giảm thêm 30% trên tổng giá trị đơn hàng.
 * Nếu không có discount voucher code nào, sẽ giảm chiết khấu 5% trên tổng giá trị đơn hàng nếu đơn hàng lớn hơn 2 triệu đồng.
 * Tổng giá trị giảm giá không được vượt quá giá trị đơn hàng.
 * @param price nguyên giá trị đơn hàng
 * @param discountOptions các tùy chọn giảm giá
 * @returns số tiền giảm giá
 */

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
// 12. price is 2000000
// 14. price is 2000000, customerClass is PREMIUM
// 15. price is 2000000, customerClass is NORMAL
// 18. price is 2000000, customerClass is VIP
// 16. price is 2000000, customerClass is VIP, discountVoucherCode is WELCOME10
// 17. price is 2000000, customerClass is VIP, discountVoucherCode is BLACKFRIDAY
// 21. price is 2000000, discountVoucherCode is WELCOME10
// 22. price is 2000000, discountVoucherCode is BLACKFRIDAY

enum CustomerDiscountRate {
  VIP = 0.1, // 10%
  PREMIUM = 0.05, // 5%
  NORMAL = 0, // 0%
  DEFAULT = 0 // 0%
}

enum DiscountVoucherRate {
  WELCOME10 = 0.1, // 10%
  BLACKFRIDAY = 0.3, // 30%
}

export function calculateDiscount(price: number, discountOptions: DiscountOptions = {}): number {
  if (price <= 0) return 0;

  const { customerClass, discountVoucherCode } = discountOptions;

  let discountRate = customerClass ? CustomerDiscountRate[customerClass] : CustomerDiscountRate.DEFAULT;

  if (discountVoucherCode && DiscountVoucherRate[discountVoucherCode as keyof typeof DiscountVoucherRate] !== undefined) {
    discountRate += DiscountVoucherRate[discountVoucherCode as keyof typeof DiscountVoucherRate];
  } else if (!discountVoucherCode) {
    discountRate += price >= 2000000 ? 0.05 : 0;
  }

  const discount = price * discountRate;

  return Math.round(discount);
}
