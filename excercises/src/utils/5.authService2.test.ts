import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  AuthService2,
  HttpClient,
  Credentials,
  UserData,
} from "./5.authService2";

const TEST_CREDENTIALS: Credentials = {
  username: "testuser",
  password: "password123",
};

const TEST_TOKEN = "test-jwt-token-123";
const TEST_USER_DATA: UserData = {
  id: 1,
  username: "testuser",
  email: "test@example.com",
};

const AUTH_API_URL = "https://test-auth-api.com/login";
const USER_API_URL = "https://test-user-api.com/user";

describe("AuthService2", () => {
  let authService: AuthService2;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = {
      post: vi.fn(),
      get: vi.fn(),
    };

    authService = new AuthService2(mockHttpClient, AUTH_API_URL, USER_API_URL);
  });

  describe(".getToken", () => {
    it("should return token when credentials are valid", async () => {
      // Arrange
      mockHttpClient.post = vi.fn().mockResolvedValue({ token: TEST_TOKEN });

      // Act
      const token = await authService.getToken(TEST_CREDENTIALS);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        AUTH_API_URL,
        TEST_CREDENTIALS
      );
      expect(token).toBe(TEST_TOKEN);
    });

    it("should return empty string when no token is returned", async () => {
      // Arrange
      mockHttpClient.post = vi.fn().mockResolvedValue({ token: null });

      // Act
      const token = await authService.getToken(TEST_CREDENTIALS);

      // Assert
      expect(token).toBe("");
    });

    it("should return empty string when API call fails", async () => {
      // Arrange
      mockHttpClient.post = vi
        .fn()
        .mockRejectedValue(new Error("Network error"));

      // Act
      const token = await authService.getToken(TEST_CREDENTIALS);

      // Assert
      expect(token).toBe("");
    });
  });

  describe(".getUserData", () => {
    it("should return user data when token is valid", async () => {
      // Arrange
      mockHttpClient.get = vi.fn().mockResolvedValue(TEST_USER_DATA);

      // Act
      const userData = await authService.getUserData(TEST_TOKEN);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(USER_API_URL, {
        Authorization: `Bearer ${TEST_TOKEN}`,
      });
      expect(userData).toEqual(TEST_USER_DATA);
    });

    it("should return null when token is empty", async () => {
      // Act
      const userData = await authService.getUserData("");

      // Assert
      expect(userData).toBeNull();
      expect(mockHttpClient.get).not.toHaveBeenCalled();
    });

    it("should return null when API returns undefined data", async () => {
      // Arrange
      mockHttpClient.get = vi.fn().mockResolvedValue(undefined);

      // Act
      const userData = await authService.getUserData(TEST_TOKEN);

      // Assert
      expect(userData).toBeNull();
    });

    it("should return null when API call fails", async () => {
      // Arrange
      mockHttpClient.get = vi.fn().mockRejectedValue(new Error("Unauthorized"));

      // Act
      const userData = await authService.getUserData(TEST_TOKEN);

      // Assert
      expect(userData).toBeNull();
    });
  });

  describe(".login", () => {
    it("should return user data on successful login", async () => {
      // Arrange
      mockHttpClient.post = vi.fn().mockResolvedValue({ token: TEST_TOKEN });
      mockHttpClient.get = vi.fn().mockResolvedValue(TEST_USER_DATA);

      // Act
      const result = await authService.login(TEST_CREDENTIALS);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        AUTH_API_URL,
        TEST_CREDENTIALS
      );
      expect(mockHttpClient.get).toHaveBeenCalledWith(USER_API_URL, {
        Authorization: `Bearer ${TEST_TOKEN}`,
      });
      expect(result).toEqual(TEST_USER_DATA);
    });

    it("should throw error when token is empty", async () => {
      // Arrange
      mockHttpClient.post = vi.fn().mockResolvedValue({ token: null });

      // Act & Assert
      await expect(authService.login(TEST_CREDENTIALS)).rejects.toThrow(
        "Authentication failed: Invalid token"
      );
    });

    it("should throw error when user data is null", async () => {
      // Arrange
      mockHttpClient.post = vi.fn().mockResolvedValue({ token: TEST_TOKEN });
      mockHttpClient.get = vi.fn().mockResolvedValue(null);

      // Act & Assert
      await expect(authService.login(TEST_CREDENTIALS)).rejects.toThrow(
        "Authentication failed: Invalid token"
      );
    });

    it("should throw error when API call for token fails", async () => {
      // Arrange
      mockHttpClient.post = vi
        .fn()
        .mockRejectedValue(new Error("Network error"));

      // Act & Assert
      await expect(authService.login(TEST_CREDENTIALS)).rejects.toThrow(
        "Authentication failed: Invalid token"
      );
    });

    it("should throw error when API call for user data fails", async () => {
      // Arrange
      mockHttpClient.post = vi.fn().mockResolvedValue({ token: TEST_TOKEN });
      mockHttpClient.get = vi.fn().mockRejectedValue(new Error("Unauthorized"));

      // Act & Assert
      await expect(authService.login(TEST_CREDENTIALS)).rejects.toThrow(
        "Authentication failed: Invalid token"
      );
    });
  });
});
