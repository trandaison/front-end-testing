import { AuthService } from './4.authService';
import { vi } from 'vitest';

describe('AuthService', () => {
  describe('.login', () => {
    let authService: AuthService;

    beforeEach(() => {
      authService = new AuthService();
      vi.restoreAllMocks();
    });

    it('should successfully login and return a token', async () => {
      const mockToken = 'mocked-token';
      const mockResponse = { token: mockToken };
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      });

      vi.stubGlobal('fetch', mockFetch);

      const credentials = { username: 'testuser', password: 'testpassword' };
      const token = await authService.login(credentials);

      expect(token).toBe(mockToken);
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    });

    it('should throw an error if login fails (response not ok)', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
      });

      vi.stubGlobal('fetch', mockFetch);

      const credentials = { username: 'testuser', password: 'testpassword' };
      await expect(authService.login(credentials)).rejects.toThrow('Login failed');
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    });

    it('should throw an error if the response does not contain a token', async () => {
      const mockResponse = {};
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      });

      vi.stubGlobal('fetch', mockFetch);

      const credentials = { username: 'testuser', password: 'testpassword' };
      await expect(authService.login(credentials)).rejects.toThrow('Invalid token');
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    });
  });
});
