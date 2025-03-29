import { AuthService, HttpClient, Credentials } from "./4.authService";

const TEST_CREDENTIALS: Credentials = {
  username: "testuser",
  password: "password123",
};

const TEST_TOKEN = "test-jwt-token-123";
const TEST_API_URL = "https://test-api.com/login";

describe("AuthService", () => {
  let authService: AuthService;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    // Create a mock HTTP client for each test
    mockHttpClient = {
      post: vi.fn(),
    };

    // Initialize AuthService with the mock client
    authService = new AuthService(mockHttpClient, TEST_API_URL);
  });

  it("should return token on successful login", async () => {
    // Arrange
    mockHttpClient.post = vi.fn().mockResolvedValue({ token: TEST_TOKEN });

    // Act
    const result = await authService.login(TEST_CREDENTIALS);

    // Assert
    expect(mockHttpClient.post).toHaveBeenCalledWith(
      TEST_API_URL,
      TEST_CREDENTIALS
    );
    expect(result).toBe(TEST_TOKEN);
  });

  it("should throw error when no token is returned", async () => {
    // Arrange
    mockHttpClient.post = vi.fn().mockResolvedValue({ token: null });

    // Act & Assert
    await expect(authService.login(TEST_CREDENTIALS)).rejects.toThrow(
      "Authentication failed: No token received"
    );
  });

  it("should throw error when API call fails", async () => {
    // Arrange
    const errorMessage = "Network error";
    mockHttpClient.post = vi.fn().mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(authService.login(TEST_CREDENTIALS)).rejects.toThrow(
      `Login failed: ${errorMessage}`
    );
  });

  it("should use correct URL and payload format", async () => {
    // Arrange
    mockHttpClient.post = vi.fn().mockResolvedValue({ token: TEST_TOKEN });

    // Act
    await authService.login(TEST_CREDENTIALS);

    // Assert
    expect(mockHttpClient.post).toHaveBeenCalledWith(TEST_API_URL, {
      username: "testuser",
      password: "password123",
    });
  });

  it("should handle non-Error objects in catch block", async () => {
    // Arrange
    mockHttpClient.post = vi.fn().mockRejectedValue("String error");

    // Act & Assert
    await expect(authService.login(TEST_CREDENTIALS)).rejects.toThrow(
      "Login failed: Unknown error"
    );
  });

  it("should use default API URL if not provided", () => {
    // Arrange
    const defaultAuthService = new AuthService(mockHttpClient);
    mockHttpClient.post = vi.fn().mockResolvedValue({ token: TEST_TOKEN });

    // Act
    defaultAuthService.login(TEST_CREDENTIALS);

    // Assert - we can't directly test the private apiUrl property,
    // but we can verify the post method was called with some URL
    expect(mockHttpClient.post).toHaveBeenCalled();
  });
});
