import { describe, it, expect } from "vitest";
import { calculateTotalPrice, Product } from "./1.cart";

describe("calculateTotalPrice", () => {
  it("should return 0 for an empty cart", () => {
    // Arrange
    const products: Product[] = [];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(0);
  });

  it("should calculate correct total for a single product", () => {
    // Arrange
    const products: Product[] = [{ product_id: 1, price: 100, quantity: 2 }];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(200);
  });

  it("should calculate correct total for multiple products", () => {
    // Arrange
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 1 },
      { product_id: 2, price: 200, quantity: 2 },
      { product_id: 3, price: 300, quantity: 3 },
    ];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(1400);
  });

  it("should handle decimal prices correctly", () => {
    // Arrange
    const products: Product[] = [
      { product_id: 1, price: 10.5, quantity: 2 },
      { product_id: 2, price: 20.25, quantity: 1 },
    ];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(41.25);
  });

  it("should handle zero price products", () => {
    // Arrange
    const products: Product[] = [
      { product_id: 1, price: 0, quantity: 5 },
      { product_id: 2, price: 100, quantity: 1 },
    ];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(100);
  });

  it("should handle products with zero quantity", () => {
    // Arrange
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 0 },
      { product_id: 2, price: 200, quantity: 1 },
    ];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(200);
  });

  it("should handle negative prices correctly", () => {
    // Arrange
    const products: Product[] = [
      { product_id: 1, price: -50, quantity: 2 },
      { product_id: 2, price: 100, quantity: 1 },
    ];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(0);
  });

  it("should handle negative quantities correctly", () => {
    // Arrange
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: -2 },
      { product_id: 2, price: 50, quantity: 3 },
    ];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(-50);
  });

  it("should handle decimal quantities correctly", () => {
    // Arrange
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 1.5 },
      { product_id: 2, price: 50, quantity: 2.25 },
    ];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(262.5);
  });

  it("should handle NaN prices correctly", () => {
    // Arrange
    const products: Product[] = [
      { product_id: 1, price: NaN, quantity: 2 },
      { product_id: 2, price: 100, quantity: 1 },
    ];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(100);
  });

  it("should handle NaN quantities correctly", () => {
    // Arrange
    const products: Product[] = [
      { product_id: 1, price: 200, quantity: NaN },
      { product_id: 2, price: 100, quantity: 1 },
    ];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(100);
  });

  it("should handle very large numbers without precision loss", () => {
    // Arrange
    const products: Product[] = [
      { product_id: 1, price: 9999999.99, quantity: 10 },
    ];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(99999999.9);
  });

  it("should handle very small decimal numbers correctly", () => {
    // Arrange
    const products: Product[] = [
      { product_id: 1, price: 0.0001, quantity: 10000 },
    ];

    // Act
    const result = calculateTotalPrice(products);

    // Assert
    expect(result).toBe(1);
  });
});
