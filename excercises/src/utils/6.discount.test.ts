import { describe, it, expect } from "vitest";
import { calculateDiscount } from "./6.discount";

describe("calculateDiscount", () => {
  it("returns 0 if price is 0 or negative", () => {
    expect(calculateDiscount(0)).toBe(0);
    expect(calculateDiscount(-1000)).toBe(0);
  });

  it('should return 0 for invalid customerClass', () => {
    expect(calculateDiscount(1000, { customerClass: 'INVALID' })).toBe(0);
  });

  it('should return 0 for invalid discountVoucherCode', () => {
    expect(calculateDiscount(1000, { discountVoucherCode: 'INVALID' })).toBe(0);
  });

  it("applies VIP discount correctly", () => {
    expect(calculateDiscount(1000000, { customerClass: "VIP" })).toBe(100000);
  });

  it("applies PREMIUM discount correctly", () => {
    expect(calculateDiscount(1000000, { customerClass: "PREMIUM" })).toBe(
      50000
    );
  });

  it("applies NORMAL discount correctly", () => {
    expect(calculateDiscount(1000000, { customerClass: "NORMAL" })).toBe(0);
  });

  it("applies WELCOME10 voucher correctly", () => {
    expect(
      calculateDiscount(1000000, { discountVoucherCode: "WELCOME10" })
    ).toBe(100000);
  });

  it("applies BLACKFRIDAY voucher correctly", () => {
    expect(
      calculateDiscount(1000000, { discountVoucherCode: "BLACKFRIDAY" })
    ).toBe(300000);
  });

  it("applies additional 5% discount for orders above 2 million if no voucher is used", () => {
    expect(calculateDiscount(3000000)).toBe(150000);
  });

  it("ensures discount does not exceed order value", () => {
    expect(
      calculateDiscount(100000, {
        customerClass: "VIP",
        discountVoucherCode: "BLACKFRIDAY",
      })
    ).toBe(40000);
  });

  it("should return full price when customerClass is unknown", () => {
    const price = 1000000;
    const discount = calculateDiscount(price, { customerClass: "UNKNOWN" });
    expect(discount).toBe(0);
  });

  it("should apply discount when no voucher code but price > 2M", () => {
    const price = 3000000;
    const discount = calculateDiscount(price, {});
    expect(discount).toBe(150000);
  });

  it("should return correct price when discount makes final price 0", () => {
    const price = 10000;
    const discount = calculateDiscount(price, {
      discountVoucherCode: "BLACKFRIDAY",
    });
    expect(discount).toBe(3000);
  });
});
