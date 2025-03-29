import * as authService from './5.authService';
import { describe, it, expect, vi } from 'vitest';

describe('authService', () => {
  it('should call login with correct parameters', async () => {
    const mockCredentials = { username: 'testUser', password: 'testPass' };
    const mockResponse = { token: 'mockToken' };

    // Mock the fetch function
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    ) as unknown as typeof fetch;

    const authServiceInstance = new authService.AuthService();
    const token = await authServiceInstance.login(mockCredentials);

    expect(token).toBe(mockResponse);
    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(mockCredentials),
    });
    expect(fetch).toHaveBeenCalledTimes(2);
    // Clean up the mock
    vi.restoreAllMocks();
  })

  it('should throw an error if fetch fails', async () => {
    const mockCredentials = { username: 'testUser', password: 'testPass' };

    // Mock the fetch function to simulate a failed response
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as unknown as typeof fetch;

    const authServiceInstance = new authService.AuthService();

    await expect(authServiceInstance.login(mockCredentials)).rejects.toThrow('Network error');

    // Clean up the mock
    vi.restoreAllMocks();
  });

  it('should throw an error if login fails', async () => {
    const mockCredentials = { username: 'testUser', password: 'testPass' };

    // Mock the fetch function to simulate a failed response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as unknown as typeof fetch;

    const authServiceInstance = new authService.AuthService();

    const info = await authServiceInstance.login(mockCredentials);
    expect(info).toBe('Invalid login credentials');

    // Clean up the mock
    vi.restoreAllMocks();
  });

  it('should throw an error if token is invalid', async () => {
    const mockCredentials = { username: 'testUser', password: 'testPass' };

    // Mock the fetch function to simulate a failed response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as unknown as typeof fetch;

    const authServiceInstance = new authService.AuthService();

    const info = await authServiceInstance.login(mockCredentials);
    expect(info).toBe('Invalid login credentials');

    // Clean up the mock
    vi.restoreAllMocks();
  });

  it('should throw an error if user fetch fails', async () => {
    const mockCredentials = { username: 'testUser', password: 'testPass' };
    const mockResponse = { token: 'mockToken' };

    const mockFetch = vi.fn()
    .mockReturnValueOnce(Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    }))
    .mockReturnValueOnce(Promise.resolve({
      ok: false,
    }));

    // Mock the fetch function to simulate a failed response
    global.fetch = mockFetch as unknown as typeof fetch;

    const authServiceInstance = new authService.AuthService();

    const info = await authServiceInstance.login(mockCredentials);
    expect(info).toBe('Failed to login');

    // Clean up the mock
    vi.restoreAllMocks();
  });

  it('should throw an error if user data is invalid', async () => {
    const mockCredentials = { username: 'testUser', password: 'testPass' };
    const mockResponse = { token: 'mockToken' };

    const mockFetch = vi.fn()
    .mockReturnValueOnce(Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    }))
    .mockReturnValueOnce(Promise.resolve({
      ok: true,
      json: () => Promise.resolve(),
    }));

    // Mock the fetch function to simulate a failed response
    global.fetch = mockFetch as unknown as typeof fetch;

    const authServiceInstance = new authService.AuthService();

    const info = await authServiceInstance.login(mockCredentials);
    expect(info).toBe('Failed to login');

    // Clean up the mock
    vi.restoreAllMocks();
  })
})