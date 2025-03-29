import { describe, it, expect } from 'vitest';
import { validateUserInput } from './3.input';

describe('validateUserInput', () => {
  it('returns true for valid input', () => {
    const input = {
      username: 'ValidUser',
      email: 'user@example.com',
      password: 'ValidPass123',
    };
    expect(validateUserInput(input)).toBe(true);
  });

  it('returns errors for missing fields', () => {
    const input = { username: '', email: '', password: '' };
    expect(validateUserInput(input)).toEqual([
      'Username is required',
      'Email is required',
      'Password is required',
    ]);
  });

  it('validates username length', () => {
    expect(validateUserInput({ username: 'ab', email: 'test@example.com', password: 'ValidPass1' })).toContain(
      'Username must be between 3 and 20 characters'
    );
    expect(validateUserInput({ username: 'a'.repeat(21), email: 'test@example.com', password: 'ValidPass1' })).toContain(
      'Username must be between 3 and 20 characters'
    );
  });

  it('validates email format', () => {
    expect(validateUserInput({ username: 'User123', email: 'invalid-email', password: 'ValidPass1' })).toContain(
      'Email is invalid'
    );
  });

  it('validates password length and uppercase letter', () => {
    expect(validateUserInput({ username: 'User123', email: 'test@example.com', password: 'Vali1' })).toContain(
      'Password must be between 6 and 40 characters'
    );
    expect(validateUserInput({ username: 'User123', email: 'test@example.com', password: 'lowercasepassword1' })).toContain(
      'Password must contain at least one uppercase letter'
    );
  });
});
