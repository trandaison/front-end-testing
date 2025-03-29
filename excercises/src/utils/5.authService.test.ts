import { AuthService } from './5.authService';

describe('AuthService', () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;
  const authService = new AuthService();

  it('should return user data on successful login', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'mocked_token' }),
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, name: 'Mock User' }),
    });

    const userData = await authService.login({ username: 'user', password: 'pass' });
    expect(userData).toEqual({ id: 1, name: 'Mock User' });
  });

  it('should return error message if login request fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const result = await authService.login({ username: 'user', password: 'wrong' });
    expect(result).toBe('Invalid login credentials');
  });

  it('should return error message if token is missing', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const result = await authService.login({ username: 'user', password: 'pass' });
    expect(result).toBe('Invalid login credentials');
  });

  it('should return error message if fetching user data fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'mocked_token' }),
    });
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const result = await authService.login({ username: 'user', password: 'pass' });
    expect(result).toBe('Failed to login');
  });

  it('should return error message if user data is empty', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'mocked_token' }),
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const result = await authService.login({ username: 'user', password: 'pass' });
    expect(result).toBe('Failed to login');
  });
});
