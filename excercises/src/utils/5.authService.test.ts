import { describe, it, expect, vi } from "vitest";
import { AuthService } from "./5.authService";

describe('AuthService - login', () => {
  const authService = new AuthService();
  const validCredentials = { username: 'user123', password: 'password' };
  const fakeToken = 'fake-jwt-token';
  const fakeUser = { id: 1, name: 'John Doe' };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns user data on successful login', async () => {
    vi.spyOn(authService, 'fetchToken').mockResolvedValue(fakeToken);
    vi.spyOn(authService, 'fetchUser').mockResolvedValue(fakeUser);

    const result = await authService.login(validCredentials);
    expect(result).toEqual(fakeUser);
    expect(authService.fetchToken).toHaveBeenCalledWith(validCredentials);
    expect(authService.fetchUser).toHaveBeenCalledWith(fakeToken);
  });

  it('returns error if fetchToken fails', async () => {
    vi.spyOn(authService, 'fetchToken').mockResolvedValue(null);
    vi.spyOn(authService, 'fetchUser').mockImplementation(() => Promise.resolve(null)); // 👈 Fix lỗi
  
    const result = await authService.login(validCredentials);
  
    expect(result).toBe('Invalid login credentials');
    expect(authService.fetchToken).toHaveBeenCalledWith(validCredentials);
    expect(authService.fetchUser).not.toHaveBeenCalled();
  });

  it('returns error if fetchUser fails', async () => {
    vi.spyOn(authService, 'fetchToken').mockResolvedValue(fakeToken);
    vi.spyOn(authService, 'fetchUser').mockResolvedValue(null);

    const result = await authService.login(validCredentials);
    expect(result).toBe('Failed to login');
    expect(authService.fetchToken).toHaveBeenCalledWith(validCredentials);
    expect(authService.fetchUser).toHaveBeenCalledWith(fakeToken);
  });

  // 🔴 TEST CASE BỔ SUNG ĐỂ ĐẠT 100% COVERAGE

  it('throws an error if fetchToken encounters a network error', async () => {
    vi.spyOn(authService, 'fetchToken').mockRejectedValue(new Error('Network Error'));

    await expect(authService.login(validCredentials)).rejects.toThrow('Network Error');
    expect(authService.fetchToken).toHaveBeenCalledWith(validCredentials);
  });

  it('throws an error if fetchUser encounters a network error', async () => {
    vi.spyOn(authService, 'fetchToken').mockResolvedValue(fakeToken);
    vi.spyOn(authService, 'fetchUser').mockRejectedValue(new Error('User fetch failed'));

    await expect(authService.login(validCredentials)).rejects.toThrow('User fetch failed');
    expect(authService.fetchToken).toHaveBeenCalledWith(validCredentials);
    expect(authService.fetchUser).toHaveBeenCalledWith(fakeToken);
  });

  it('returns error if fetchToken returns an object without a token', async () => {
    vi.spyOn(authService, 'fetchToken').mockResolvedValue(null); // Trường hợp trả về `{}` hoặc không có token

    const result = await authService.login(validCredentials);
    expect(result).toBe('Invalid login credentials');
  });

  it('returns error if fetchUser returns an empty object', async () => {
    vi.spyOn(authService, 'fetchToken').mockResolvedValue(fakeToken);
    vi.spyOn(authService, 'fetchUser').mockResolvedValue({}); // API trả về object rỗng

    const result = await authService.login(validCredentials);
    expect(result).toBe('Failed to login');
  });

  it('returns null if fetchToken API fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({}),
    });
  
    const result = await authService.fetchToken(validCredentials);
    expect(result).toBeNull();
  });

  it('returns null if fetchUser API fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({}),
    });
  
    const result = await authService.fetchUser(fakeToken);
    expect(result).toBeNull();
  });
  
  it('returns error if user data is missing ID', async () => {
    vi.spyOn(authService, 'fetchToken').mockResolvedValue(fakeToken);
    vi.spyOn(authService, 'fetchUser').mockResolvedValue({ name: 'John Doe' }); // Không có id
  
    const result = await authService.login(validCredentials);
    expect(result).toBe('Failed to login');
  });

  it('returns null if fetchToken API response does not contain token', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({}), // Không có token
    });
  
    const result = await authService.fetchToken(validCredentials);
    expect(result).toBeNull();
  });
  
  it('returns null if fetchUser API fails to parse JSON', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
    });
  
    const result = await authService.fetchUser(fakeToken);
    expect(result).toBeNull();
  });
});
