import { describe, it, expect, vi } from 'vitest';
import { AuthService } from './4.authService';

global.fetch = vi.fn();

describe('AuthService - login', () => {
  const authService = new AuthService();
  const validCredentials = { username: 'user123', password: 'password' };
  const fakeToken = 'fake-jwt-token';

  it('returns token on successful login', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({ token: fakeToken })
    });

    const token = await authService.login(validCredentials);
    expect(token).toBe(fakeToken);
    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', expect.any(Object));
  });

  it('throws error on failed login request', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(authService.login(validCredentials)).rejects.toThrow('Request failed');
  });

  it('throws error if token is missing in response', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({})
    });

    await expect(authService.login(validCredentials)).rejects.toThrow('Invalid token');
  });
});
