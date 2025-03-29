import * as authService from './4.authService';
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

    expect(token).toBe(mockResponse.token);
    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(mockCredentials),
    });
    expect(fetch).toHaveBeenCalledTimes(1);
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

    await expect(authServiceInstance.login(mockCredentials)).rejects.toThrow('Login failed');

    // Clean up the mock
    vi.restoreAllMocks();
  });

  it('should throw an error if token is invalid', async () => {
    const mockCredentials = { username: 'testUser', password: 'testPass' };

    // Mock the fetch function to simulate a response without a token
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as unknown as typeof fetch;

    const authServiceInstance = new authService.AuthService();

    await expect(authServiceInstance.login(mockCredentials)).rejects.toThrow('Invalid token');

    // Clean up the mock
    vi.restoreAllMocks();
  })
})