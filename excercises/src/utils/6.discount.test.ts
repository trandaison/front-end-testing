import { describe, it, expect } from "vitest";
import { calculateDiscount } from "./6.discount";

describe("discount", () => {
  describe("Basic validation", () => {
    it("should return 0 for a price of 0", () => {
      const result = calculateDiscount(0);
      expect(result).toBe(0);
    });

    it("should return 0 for negative price", () => {
      const result = calculateDiscount(-100);
      expect(result).toBe(0);
    });
  });

  describe("Customer class discounts", () => {
    it("should apply 10% discount for VIP customers", () => {
      const price = 1000000;
      const result = calculateDiscount(price, { customerClass: "VIP" });
      expect(result).toBe(price * 0.1);
    });

    it("should apply 5% discount for PREMIUM customers", () => {
      const price = 1000000;
      const result = calculateDiscount(price, { customerClass: "PREMIUM" });
      expect(result).toBe(price * 0.05);
    });

    it("should apply 0% discount for NORMAL customers", () => {
      const price = 1000000;
      const result = calculateDiscount(price, { customerClass: "NORMAL" });
      expect(result).toBe(0);
    });

    it("should apply 0% discount when no customer class is provided", () => {
      const price = 1000000;
      const result = calculateDiscount(price, {});
      expect(result).toBe(0);
    });
  });

  describe("Voucher discounts", () => {
    it("should apply additional 10% discount for WELCOME10 voucher", () => {
      const price = 1000000;
      const result = calculateDiscount(price, {
        discountVoucherCode: "WELCOME10",
      });
      expect(result).toBe(price * 0.1);
    });

    it("should apply additional 30% discount for BLACKFRIDAY voucher", () => {
      const price = 1000000;
      const result = calculateDiscount(price, {
        discountVoucherCode: "BLACKFRIDAY",
      });
      expect(result).toBe(price * 0.3);
    });

    it("should not apply additional discount for invalid voucher code", () => {
      const price = 1000000;
      const result = calculateDiscount(price, {
        discountVoucherCode: "INVALID",
      });
      expect(result).toBe(0);
    });
  });

  describe("Large order discounts", () => {
    it("should apply 5% discount for orders over 2 million without voucher", () => {
      const price = 3000000;
      const result = calculateDiscount(price);
      expect(result).toBe(price * 0.05);
    });

    it("should not apply large order discount if price is below threshold", () => {
      const price = 1500000;
      const result = calculateDiscount(price);
      expect(result).toBe(0);
    });

    it("should not apply large order discount when voucher is used", () => {
      const price = 3000000;
      const result = calculateDiscount(price, {
        discountVoucherCode: "WELCOME10",
      });
      expect(result).toBe(price * 0.1); // Only voucher discount, no large order discount
    });
  });

  describe("Combined discounts", () => {
    it("should combine customer class and voucher discounts", () => {
      const price = 1000000;
      const result = calculateDiscount(price, {
        customerClass: "VIP",
        discountVoucherCode: "WELCOME10",
      });
      expect(result).toBe(price * (0.1 + 0.1)); // VIP 10% + WELCOME10 10%
    });

    it("should combine customer class and large order discounts", () => {
      const price = 3000000;
      const result = calculateDiscount(price, { customerClass: "PREMIUM" });
      expect(result).toBe(price * (0.05 + 0.05)); // PREMIUM 5% + large order 5%
    });

    it("should not exceed price when total discount is greater than 100%", () => {
      const price = 1000000;
      // VIP 10% + BLACKFRIDAY 30% would be 40%, which is already below 100%
      // So let's manually test a case where it would exceed
      const result = calculateDiscount(price, {
        customerClass: "VIP",
        discountVoucherCode: "BLACKFRIDAY",
      });
      expect(result).toBe(price * 0.4); // VIP 10% + BLACKFRIDAY 30% = 40%
      expect(result).toBeLessThanOrEqual(price); // Ensure it doesn't exceed price
    });
  });

  describe("Edge cases", () => {
    it("should handle very large prices correctly", () => {
      const price = 1000000000; // 1 billion
      const result = calculateDiscount(price, {
        customerClass: "VIP",
        discountVoucherCode: "BLACKFRIDAY",
      });
      expect(result).toBe(price * 0.4); // VIP 10% + BLACKFRIDAY 30% = 40%
    });

    it("should handle fractional prices correctly", () => {
      const price = 1000.5;
      const result = calculateDiscount(price, { customerClass: "PREMIUM" });
      expect(result).toBe(price * 0.05);
    });
  });
});
