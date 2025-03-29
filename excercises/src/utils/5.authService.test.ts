import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './5.authService';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    globalThis.fetch = vi.fn();
  });

  const params = { username: 'username', password: 'password' };
  const user = { name: 'name' };

  it('return user data', async () => {
    globalThis.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ token: "token" }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(params),
      } as Response);

    const userData = await authService.login(params);
    
    expect(userData).toEqual(params);
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });

  it('return Invalid login credentials', async () => {
    globalThis.fetch.mockResolvedValueOnce({ ok: false });
    
    const result = await authService.login(params);
    expect(result).toBe('Invalid login credentials');
  });

  it('return Invalid login credentials', async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response);
    
    const result = await authService.login(params);
    expect(result).toBe('Invalid login credentials');
  });

  it('return Failed to login fail api', async () => {
    globalThis.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ token: 'token' }),
      } as Response)
      .mockResolvedValueOnce({ ok: false });
    
    const result = await authService.login(params);
    expect(result).toBe('Failed to login');
  });

  it('return user null', async () => {
    globalThis.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ token: "token" }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(null),
      } as Response);

    const result = await authService.login(params);
    
    expect(result).toBe('Failed to login');
  });
});
