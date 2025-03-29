import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './4.authService';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    globalThis.fetch = vi.fn()
    vi.restoreAllMocks();
  });

  const params = { username: 'username', password: 'password' }

  it('return token', async () => {
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ token: 'token' }),
    } as Response);

    const token = await authService.login(params);

    expect(token).toBe('token');
  });

  it('return Login failed', async () => {
    (globalThis.fetch).mockResolvedValue({ ok: false });

    await expect(authService.login(params))
      .rejects.toThrow('Login failed');
  });

  it('return Invalid token', async () => {
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response);

    await expect(authService.login(params))
      .rejects.toThrow('Invalid token');
  });
});
