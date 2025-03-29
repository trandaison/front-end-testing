import { calculateTotalPrice, Product } from "./1.cart";

describe("Card", () => {
  describe(".calculateTotalPrice", () => {
    it("should return 0 if cart is empty", () => {
      const products = [] as Product[];
      expect(calculateTotalPrice(products)).toBe(0);
    });

    it("should return correct total price if cart has one product", () => {
      const products = [
        { product_id: 1, price: 100, quantity: 2 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(200);
    });

    it("should return correct total price if cart has many products", () => {
      const products = [
        { product_id: 1, price: 100, quantity: 2 },
        { product_id: 2, price: 50, quantity: 3 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(350);
    });

    it("should return correct total price if product quantity is large", () => {
      const products = [
        { product_id: 1, price: 100, quantity: 100 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(10000);
    });

    it("should return correct total price if product price is large", () => {
      const products = [
        { product_id: 1, price: 1000, quantity: 2 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(2000);
    });

    it("should return correct total price if product price and quantity are large", () => {
      const products = [
        { product_id: 1, price: 1000, quantity: 100 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(100000);
    });

    it("should return correct total price if product price is 0", () => {
      const products = [
        { product_id: 1, price: 0, quantity: 2 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(0);
    });

    it("should return correct total price if product quantity is 0", () => {
      const products = [
        { product_id: 1, price: 100, quantity: 0 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(0);
    });

    it("should return correct total price if product price and quantity are 0", () => {
      const products = [
        { product_id: 1, price: 0, quantity: 0 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(0);
    });

    it("should return correct total price if product price is negative", () => {
      const products = [
        { product_id: 1, price: -100, quantity: 2 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(-200);
    });

    it("should return correct total price if product quantity is negative", () => {
      const products = [
        { product_id: 1, price: 100, quantity: -2 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(-200);
    });

    it("should return correct total price if product price and quantity are negative", () => {
      const products = [
        { product_id: 1, price: -100, quantity: -2 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(200);
    });

    it("should return correct total price if product price is float", () => {
      const products = [
        { product_id: 1, price: 100.5, quantity: 2 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(201);
    });

    it("should return correct total price if product quantity is float", () => {
      const products = [
        { product_id: 1, price: 100, quantity: 2.5 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(250);
    });

    it("should return correct total price if product price and quantity are float", () => {
      const products = [
        { product_id: 1, price: 100.5, quantity: 2.5 },
      ] as Product[];
      expect(calculateTotalPrice(products)).toBe(251.25);
    });
  });
});
