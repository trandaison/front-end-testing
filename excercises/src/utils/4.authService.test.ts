import { AuthService } from './4.authService';

describe('AuthService', () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;
  const authService = new AuthService();

  it('should return a token on successful login', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'mocked_token' }),
    });

    const token = await authService.login({ username: 'user', password: 'pass' });
    expect(token).toBe('mocked_token');
  });

  it('should throw an error if login request fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(authService.login({ username: 'user', password: 'wrong' })).rejects.toThrow('Login failed');
  });

  it('should throw an error if token is missing', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await expect(authService.login({ username: 'user', password: 'pass' })).rejects.toThrow('Invalid token');
  });
});
