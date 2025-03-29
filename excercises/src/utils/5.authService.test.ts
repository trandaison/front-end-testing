import { AuthService } from "./5.authService";
import { vi } from "vitest";

describe("authService", () => {
  describe(".login", () => {
    describe(".login", () => {
      const mockFetch = vi.fn();
      const authService = new AuthService();

      it("should return user data if login is successful", async () => {
        const mockCredentials = { username: "test", password: "password" };
        const mockToken = "valid-token";
        const mockUserData = { id: 1, name: "John Doe" };

        mockFetch
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ token: mockToken }),
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => mockUserData,
          });

        const result = await authService.login(mockFetch, mockCredentials);

        expect(result).toEqual(mockUserData);
      });

      it("should throw error if login failed", async () => {
        const mockCredentials = {
          username: "test",
          password: "wrong-password",
        };

        mockFetch.mockResolvedValueOnce({
          ok: false,
        });

        await expect(
          authService.login(mockFetch, mockCredentials)
        ).rejects.toThrow("Invalid login credentials");
      });

      it("should throw error if token is invalid", async () => {
        const mockCredentials = { username: "test", password: "password" };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ token: null }),
        });

        await expect(
          authService.login(mockFetch, mockCredentials)
        ).rejects.toThrow("Invalid login credentials");
      });

      it("should throw error if fetching user data fails", async () => {
        const mockCredentials = { username: "test", password: "password" };
        const mockToken = "valid-token";

        mockFetch
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ token: mockToken }),
          })
          .mockResolvedValueOnce({
            ok: false,
          });

        await expect(
          authService.login(mockFetch, mockCredentials)
        ).rejects.toThrow("Failed to login");
      });

      it("should throw error if user data is invalid", async () => {
        const mockCredentials = { username: "test", password: "password" };
        const mockToken = "valid-token";

        mockFetch
          .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ token: mockToken }),
          })
          .mockResolvedValueOnce({
            ok: true,
            json: async () => null,
          });

        await expect(
          authService.login(mockFetch, mockCredentials)
        ).rejects.toThrow("Failed to login");
      });
    });
  });
});
