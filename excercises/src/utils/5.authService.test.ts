import { vi } from 'vitest';

import * as AuthService from './5.authService';

describe('AuthService', () => {
  describe('login', () => {
    it('should return user data on successful login', async () => {
      const mockCredentials = { username: 'test', password: 'test' };
      const mockTokenResponse = { token: 'mockToken' };
      const mockUserResponse = { id: 1, name: 'John Doe' };
      global.fetch = vi
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockTokenResponse),
          })
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockUserResponse),
          })
        ) as unknown as typeof fetch;
      const authService = new AuthService.AuthService();
      const userData = await authService.login(mockCredentials);
      expect(userData).toEqual(mockUserResponse);
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
      });
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${mockTokenResponse.token}`,
        },
      });
      expect(fetch).toHaveBeenCalledTimes(2);
    })

    it('should return "Invalid login credentials" on failed login', async () => {
      const mockCredentials = { username: 'test', password: 'test' };
      global.fetch = vi
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: false,
          })
        ) as unknown as typeof fetch;
      const authService = new AuthService.AuthService();
      const result = await authService.login(mockCredentials);
      expect(result).toEqual('Invalid login credentials');
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
      });
    })

    it('should return "Failed to login" on failed user fetch', async () => {
      const mockCredentials = { username: 'test', password: 'test' };
      const mockTokenResponse = { token: 'mockToken' };
      global.fetch = vi
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockTokenResponse),
          })
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: false,
          })
        ) as unknown as typeof fetch;
      const authService = new AuthService.AuthService();
      const result = await authService.login(mockCredentials);
      expect(result).toEqual('Failed to login');
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
      });
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${mockTokenResponse.token}`,
        },
      });
      expect(fetch).toHaveBeenCalledTimes(2);
    })

    it('should return "Failed to login" on empty user data', async () => {
      const mockCredentials = { username: 'test', password: 'test' };
      const mockTokenResponse = { token: 'mockToken' };
      global.fetch = vi
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockTokenResponse),
          })
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(null),
          })
        ) as unknown as typeof fetch;
      const authService = new AuthService.AuthService();
      const result = await authService.login(mockCredentials);
      expect(result).toEqual('Failed to login');
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
      });
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${mockTokenResponse.token}`,
        },
      });
      expect(fetch).toHaveBeenCalledTimes(2);
    })
    it('should return "Invalid login credentials" on empty token', async () => {
      const mockCredentials = { username: 'test', password: 'test' };
      const mockTokenResponse = { token: '' };
      global.fetch = vi
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockTokenResponse),
          })
        ) as unknown as typeof fetch;
      const authService = new AuthService.AuthService();
      const result = await authService.login(mockCredentials);
      expect(result).toEqual('Invalid login credentials');
      expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
      });
    })
  })
})