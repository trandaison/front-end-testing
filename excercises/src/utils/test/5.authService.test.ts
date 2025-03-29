import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../5.authService';

// write test case .login for AuthService with cases:
// 1. login but Failed with Invalid login credentials
// 2. login but Failed to login
// 3. login successfully
// 4. login successfully but failed to get user
// 5. login successfully and get user successfully
// Use mock Promise to mock fetch function

describe('AuthService.login', () => {
  const authService = new AuthService();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should fail with Invalid login credentials', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as Response);

    const result = await authService.login({ username: 'test', password: 'test' });
    expect(result).toBe('Invalid login credentials');
  });

  it('should fail to login when token is missing', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    const result = await authService.login({ username: 'test', password: 'test' });
    expect(result).toBe('Invalid login credentials');
  });

  it('should fail to login when user fetch fails', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'fake-token' }),
      } as Response)
      .mockResolvedValueOnce({
        ok: false,
      } as Response);

    const result = await authService.login({ username: 'test', password: 'test' });
    expect(result).toBe('Failed to login');
  });

  it('should fail to get user when user data is missing', async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'fake-token' }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      } as Response);

    const result = await authService.login({ username: 'test', password: 'test' });
    expect(result).toBe('Failed to login');
  });

  it('should login successfully and get user successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe' };

    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'fake-token' }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      } as Response);

    const result = await authService.login({ username: 'test', password: 'test' });
    expect(result).toEqual(mockUser);
  });
});
