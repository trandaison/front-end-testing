import { describe, it, expect } from 'vitest';
import { validateUserInput, UserInput } from '../3.input';

// write testcase for input test of validateUserInput
describe('validateUserInput', () => {
  it('should return true for valid input', () => {
    const input: UserInput = {
      username: 'validUser',
      email: 'valid@example.com',
      password: 'Valid123'
    };
    expect(validateUserInput(input)).toBe(true);
  });

  it('should return an error if username is empty', () => {
    const input: UserInput = {
      username: '',
      email: 'valid@example.com',
      password: 'Valid123'
    };
    expect(validateUserInput(input)).toEqual(['Username is required']);
  });

  it('should return an error if username is too short', () => {
    const input: UserInput = {
      username: 'ab',
      email: 'valid@example.com',
      password: 'Valid123'
    };
    expect(validateUserInput(input)).toEqual(['Username must be between 3 and 20 characters']);
  });

  it('should return an error if username is too long', () => {
    const input: UserInput = {
      username: 'a'.repeat(21),
      email: 'valid@example.com',
      password: 'Valid123'
    };
    expect(validateUserInput(input)).toEqual(['Username must be between 3 and 20 characters']);
  });

  it('should return an error if email is empty', () => {
    const input: UserInput = {
      username: 'validUser',
      email: '',
      password: 'Valid123'
    };
    expect(validateUserInput(input)).toEqual(['Email is required']);
  });

  it('should return an error if email is invalid', () => {
    const input: UserInput = {
      username: 'validUser',
      email: 'invalid-email',
      password: 'Valid123'
    };
    expect(validateUserInput(input)).toEqual(['Email is invalid']);
  });

  it('should return an error if password is empty', () => {
    const input: UserInput = {
      username: 'VALID_USER',
      email: 'valid@example.com',
      password: ''
    };
    expect(validateUserInput(input)).toEqual(['Password is required']);
  });

  it('should return an error if password is too short', () => {
    const input: UserInput = {
      username: 'validUser',
      email: 'valid@example.com',
      password: 'Abc1'
    };
    expect(validateUserInput(input)).toEqual(['Password must be between 6 and 40 characters']);
  });

  it('should return an error if password is too long', () => {
    const input: UserInput = {
      username: 'validUser',
      email: 'valid@example.com',
      password: 'A'.repeat(41)
    };
    expect(validateUserInput(input)).toEqual(['Password must be between 6 and 40 characters']);
  });

  it('should return an error if password does not contain an uppercase letter', () => {
    const input: UserInput = {
      username: 'validUser',
      email: 'valid@example.com',
      password: 'valid123'
    };
    expect(validateUserInput(input)).toEqual(['Password must contain at least one uppercase letter']);
  });

  it('should return multiple errors for multiple invalid fields', () => {
    const input: UserInput = {
      username: '',
      email: 'invalid-email',
      password: 'short'
    };
    expect(validateUserInput(input)).toEqual([
      'Username is required',
      'Email is invalid',
      'Password must be between 6 and 40 characters',
      'Password must contain at least one uppercase letter'
    ]);
  });
});
