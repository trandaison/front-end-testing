import { AuthService } from "./4.authService";
import { vi } from "vitest";

describe("authService", () => {
  describe(".login", () => {
    it("should return token if login success", async () => {
      const fakeFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          token: "fakeToken",
        }),
      });

      const authService = new AuthService();
      const token = await authService.login(fakeFetch, {
        username: "fakeUsername",
        password: "fakePassword",
      });

      expect(token).toBe("fakeToken");
    });

    it("should throw error if login failed", async () => {
      const fakeFetch = vi.fn().mockResolvedValue({
        ok: false,
      });
      const authService = new AuthService();
      await expect(
        authService.login(fakeFetch, {
          username: "fakeUsername",
          password: "fakePassword",
        })
      ).rejects.toThrow("Login failed");
    });

    it("should throw error if token is invalid", async () => {
      const fakeFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      });
      const authService = new AuthService();
      await expect(
        authService.login(fakeFetch, {
          username: "fakeUsername",
          password: "fakePassword",
        })
      ).rejects.toThrow("Invalid token");
    });
  });
});
