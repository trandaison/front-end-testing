import { describe, it, expect } from 'vitest';
import { validateUserInput, UserInput } from './3.input';

describe('validateUserInput', () => {
  it('should return true for valid input', () => {
    const input: UserInput = {
      username: 'validuser',
      email: 'test@example.com',
      password: 'ValidPassword123'
    };

    const result = validateUserInput(input);
    expect(result).toBe(true);
  });

  it('should validate username is required', () => {
    const input: UserInput = {
      username: '',
      email: 'test@example.com',
      password: 'ValidPassword123'
    };

    const result = validateUserInput(input);
    expect(result).toContain('Username is required');
  });

  it('should validate username length', () => {
    const input: UserInput = {
      username: 'ab',
      email: 'test@example.com',
      password: 'ValidPassword123'
    };

    const result = validateUserInput(input);
    expect(result).toContain('Username must be between 3 and 20 characters');
  });

  it('should validate email is required', () => {
    const input: UserInput = {
      username: 'validuser',
      email: '',
      password: 'ValidPassword123'
    };

    const result = validateUserInput(input);
    expect(result).toContain('Email is required');
  });

  it('should validate email format', () => {
    const input: UserInput = {
      username: 'validuser',
      email: 'invalidemail',
      password: 'ValidPassword123'
    };

    const result = validateUserInput(input);
    expect(result).toContain('Email is invalid');
  });

  it('should validate password is required', () => {
    const input: UserInput = {
      username: 'validuser',
      email: 'test@example.com',
      password: ''
    };

    const result = validateUserInput(input);
    expect(result).toContain('Password is required');
  });

  it('should validate password length', () => {
    const input: UserInput = {
      username: 'validuser',
      email: 'test@example.com',
      password: 'Short'
    };

    const result = validateUserInput(input);
    expect(result).not.toContain('Password is required');
    expect(result).toContain('Password must be between 6 and 40 characters');
  });

  it('should validate password uppercase requirement', () => {
    const input: UserInput = {
      username: 'validuser',
      email: 'test@example.com',
      password: 'lowercaseonly123'
    };

    const result = validateUserInput(input);
    expect(result).toContain('Password must contain at least one uppercase letter');
  });

  it('should skip additional password validations when password is empty', () => {
    const input: UserInput = {
      username: 'validuser',
      email: 'test@example.com',
      password: ''
    };

    const result = validateUserInput(input);
    expect(result).toContain('Password is required');
    expect(result).not.toContain('Password must be between 6 and 40 characters');
    expect(result).not.toContain('Password must contain at least one uppercase letter');
  });

  it('should return multiple errors when multiple validations fail', () => {
    const input: UserInput = {
      username: '',
      email: 'invalidemail',
      password: 'short'
    };

    const result = validateUserInput(input);
    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) { // TypeScript type guard
      expect(result.length).toBeGreaterThanOrEqual(3);
      expect(result).toContain('Username is required');
      expect(result).toContain('Email is invalid');
      expect(result).toContain('Password must be between 6 and 40 characters');
    }
  });
});