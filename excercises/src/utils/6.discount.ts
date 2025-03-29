type CustomerClass = 'VIP' | 'PREMIUM' | 'NORMAL';

type DiscountOptions = {
  customerClass?: CustomerClass;
  discountVoucherCode?: string;
}

const CUSTOMER_DISCOUNTS: Record<CustomerClass, number> = {
  VIP: 0.1,
  PREMIUM: 0.05,
  NORMAL: 0,
};

const VOUCHER_DISCOUNTS: Record<string, number> = {
  WELCOME10: 0.1,
  BLACKFRIDAY: 0.3,
};

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

export function calculateDiscount(price: number, discountOptions: DiscountOptions = {}): number {
  if (price <= 0) return 0;

  const { customerClass = 'NORMAL', discountVoucherCode } = discountOptions;

  let discountRate = CUSTOMER_DISCOUNTS[customerClass] || 0;
  
  if (discountVoucherCode && VOUCHER_DISCOUNTS[discountVoucherCode]) {
    discountRate += VOUCHER_DISCOUNTS[discountVoucherCode];
  } else if (!discountVoucherCode && price > 2000000) {
    discountRate += 0.05;
  }

  return Math.min(price, price * discountRate);
}

