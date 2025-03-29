import { describe, it, expect } from "vitest";
import { calculateDiscount } from "./6.discount";

describe("calculateDiscount", () => {
  it("should return 0 if price is less than or equal to 0", () => {
    expect(calculateDiscount(0)).toBe(0);
    expect(calculateDiscount(-100)).toBe(0);
  });

  it("should apply 10% discount for VIP customers", () => {
    expect(calculateDiscount(1000000, { customerClass: "VIP" })).toBe(100000);
  });

  it("should apply 5% discount for PREMIUM customers", () => {
    expect(calculateDiscount(1000000, { customerClass: "PREMIUM" })).toBe(
      50000
    );
  });

  it("should apply no discount for NORMAL customers", () => {
    expect(calculateDiscount(1000000, { customerClass: "NORMAL" })).toBe(0);
  });

  it("should apply 10% discount for WELCOME10 voucher", () => {
    expect(
      calculateDiscount(1000000, { discountVoucherCode: "WELCOME10" })
    ).toBe(100000);
  });

  it("should apply 30% discount for BLACKFRIDAY voucher", () => {
    expect(
      calculateDiscount(1000000, { discountVoucherCode: "BLACKFRIDAY" })
    ).toBe(300000);
  });

  it("should apply additional 5% discount if no voucher and price > 2 million", () => {
    expect(calculateDiscount(3000000)).toBe(150000);
  });

  it("should not exceed the price as the discount", () => {
    expect(
      calculateDiscount(100000, {
        customerClass: "VIP",
        discountVoucherCode: "BLACKFRIDAY",
      })
    ).toBe(40000);
  });

  it("should combine customer class and voucher discounts correctly", () => {
    expect(
      calculateDiscount(1000000, {
        customerClass: "VIP",
        discountVoucherCode: "WELCOME10",
      })
    ).toBe(200000);
    expect(
      calculateDiscount(1000000, {
        customerClass: "PREMIUM",
        discountVoucherCode: "BLACKFRIDAY",
      })
    ).toBe(350000);
  });

  it("should apply no discount if no options are provided and price <= 2 million", () => {
    expect(calculateDiscount(1000000)).toBe(0);
  });
});
