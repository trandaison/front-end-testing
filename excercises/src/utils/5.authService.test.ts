import { vi, Mock } from 'vitest';
import { AuthService } from './5.authService';

vi.stubGlobal('fetch', vi.fn());

describe('AuthService', () => {
  describe('.login', () => {
    let authService: AuthService;
    let mockFetch: Mock<typeof fetch>;

    beforeEach(() => {
      mockFetch = vi.mocked(fetch);
      authService = new AuthService(mockFetch);
      mockFetch.mockClear();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should login successfully and return user data', async () => {
      const mockToken = 'mocked-token';
      const mockUserData = { id: 1, username: 'testuser' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: mockToken }),
      } as Response);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserData,
      } as Response);

      const credentials = { username: 'testuser', password: 'password' };
      const result = await authService.login(credentials);

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(mockFetch).toHaveBeenNthCalledWith(1, 'https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
      expect(mockFetch).toHaveBeenNthCalledWith(2, 'https://fakestoreapi.com/auth/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${mockToken}`,
          'Content-Type': 'application/json',
        },
      });
      expect(result).toEqual(mockUserData);
    });

    it('should return "Invalid login credentials" if token is not returned', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      const credentials = { username: 'testuser', password: 'password' };
      const result = await authService.login(credentials);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toBe('Invalid login credentials');
    });

    it('should return "Invalid login credentials" if login request fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as Response);

      const credentials = { username: 'testuser', password: 'password' };
      const result = await authService.login(credentials);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toBe('Invalid login credentials');
    });

    it('should return "Failed to login" if user data request fails', async () => {
      const mockToken = 'mocked-token';

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ token: mockToken }),
        } as Response)
        .mockResolvedValueOnce({
          ok: false,
        } as Response);

      const credentials = { username: 'testuser', password: 'password' };
      const result = await authService.login(credentials);

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result).toBe('Failed to login');
    });

    it('should return "Failed to login" if user data is not returned', async () => {
      const mockToken = 'mocked-token';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: mockToken }),
      } as Response);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      } as Response);

      const credentials = { username: 'testuser', password: 'password' };
      const result = await authService.login(credentials);

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result).toBe('Failed to login');
    });
  });
});
