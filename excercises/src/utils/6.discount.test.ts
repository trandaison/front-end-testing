import * as CalculteDiscount from "./6.discount";
import { describe, it, expect } from "vitest";

describe("calculateDiscount", () => {
  it("should return 0 for negative price", () => {
    const result = CalculteDiscount.calculateDiscount(-1000);
    expect(result).toBe(0);
  });

  it("should return 0 for zero price", () => {
    const result = CalculteDiscount.calculateDiscount(0);
    expect(result).toBe(0);
  });

  it("should apply VIP discount correctly", () => {
    const result = CalculteDiscount.calculateDiscount(10000, {
      customerClass: "VIP",
    });
    expect(result).toBe(1000);
  });

  it("should apply PREMIUM discount correctly", () => {
    const result = CalculteDiscount.calculateDiscount(10000, {
      customerClass: "PREMIUM",
    });
    expect(result).toBe(500);
  });

  it("should apply NORMAL discount correctly", () => {
    const result = CalculteDiscount.calculateDiscount(10000, {
      customerClass: "NORMAL",
    });
    expect(result).toBe(0);
  });

  it("should apply WELCOME10 voucher correctly", () => {
    const result = CalculteDiscount.calculateDiscount(10000, {
      discountVoucherCode: "WELCOME10",
    });
    expect(result).toBe(1000);
  });

  it("should apply BLACKFRIDAY voucher correctly", () => {
    const result = CalculteDiscount.calculateDiscount(10000, {
      discountVoucherCode: "BLACKFRIDAY",
    });
    expect(result).toBe(3000);
  });

  it("should apply additional discount for orders over 2 million without voucher", () => {
    const result = CalculteDiscount.calculateDiscount(2500000);
    expect(result).toBe(125000);
  });

  it("should not exceed original price with discount", () => {
    const result = CalculteDiscount.calculateDiscount(500000, {
      customerClass: "VIP",
    });
    expect(result).toBeLessThanOrEqual(500000);
  });
  it("should not exceed original price with voucher discount", () => {
    const result = CalculteDiscount.calculateDiscount(500000, {
      discountVoucherCode: "WELCOME10",
    });
    expect(result).toBeLessThanOrEqual(500000);
  });
  it("should not exceed original price with additional discount", () => {
    const result = CalculteDiscount.calculateDiscount(5000000);
    expect(result).toBeLessThanOrEqual(5000000);
  });
  it("should return 0 for negative price with additional discount", () => {
    const result = CalculteDiscount.calculateDiscount(-1000, {
      customerClass: "NORMAL",
    });
    expect(result).toBe(0);
  });
  it("should return 0 for zero price with additional discount", () => {
    const result = CalculteDiscount.calculateDiscount(0, {
      customerClass: "NORMAL",
    });
    expect(result).toBe(0);
  });
  it("should return 0 for negative price with discount options and voucher code", () => {
    const result = CalculteDiscount.calculateDiscount(-1000, {
      customerClass: "VIP",
      discountVoucherCode: "WELCOME10",
    });
    expect(result).toBe(0);
  });

  it("should return discount when discount less than price", () => {
    const result = CalculteDiscount.calculateDiscount(1000, {
      customerClass: "PREMIUM",
      discountVoucherCode: "BLACKFRIDAY",
    });
    expect(result).toBe(350);
  });
});
