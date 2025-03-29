import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AuthService } from '../4.authService';

describe('AuthService', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return a token on successful login', async () => {
    const mockToken = 'mocked-token';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: mockToken }),
    });

    const authService = new AuthService();
    const token = await authService.login({ username: 'user', password: 'pass' });

    expect(token).toBe(mockToken);
    expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'user', password: 'pass' }),
    });
  });

  it('should throw an error when login fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const authService = new AuthService();

    await expect(authService.login({ username: 'user', password: 'pass' })).rejects.toThrow('Login failed');
    expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'user', password: 'pass' }),
    });
  });

  it('should throw an error when the token is invalid', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const authService = new AuthService();

    await expect(authService.login({ username: 'user', password: 'pass' })).rejects.toThrow('Invalid token');
    expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: 'user', password: 'pass' }),
    });
  });
});