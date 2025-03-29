import { vi } from 'vitest';

import * as AuthService from './4.authService';

describe('AuthService', () => {
  describe('login', () => {
    it('should return token on successful login', async () => {
      const mockCredentials = { username: 'test', password: 'test' };
      const mockResponse = { token: 'mockToken' };

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      ) as unknown as typeof fetch;

      const authService = new AuthService.AuthService();
      const token = await authService.login(mockCredentials);

      expect(token).toBe(mockResponse.token);
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
      });
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw error on failed login', async () => {
      const mockCredentials = { username: 'test', password: 'test' };

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
        })
      ) as unknown as typeof fetch;

      const authService = new AuthService.AuthService();

      await expect(authService.login(mockCredentials)).rejects.toThrow('Login failed');
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
      });
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw error if token is invalid', async () => {
      const mockCredentials = { username: 'test', password: 'test' };

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        })
      ) as unknown as typeof fetch;

      const authService = new AuthService.AuthService();

      await expect(authService.login(mockCredentials)).rejects.toThrow('Invalid token');
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
      });
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  })
})