import * as input from './3.input';

describe('input', () => {
  describe('.validateUserInput', () => {
    it('should return true for valid input', () => {
      const inputData: input.UserInput = {
        username: 'Abc',
        email: 'abc@gmail.com',
        password: 'Abc123',
      };
      const result = input.validateUserInput(inputData);
      expect(result).toBe(true);
    })

    it('should return an array of required errors for empty input', () => {
      const inputData: input.UserInput = {
        username: '',
        email: '',
        password: '',
      };
      const result = input.validateUserInput(inputData);
      expect(result).toEqual([
        'Username is required',
        'Email is required',
        'Password is required',
      ]);
    })

    it('should return an array of errors for invalid input', () => {
      const inputData: input.UserInput = {
        username: 'ab',
        email: 'abc@gmail',
        password: 'abc',
      };
      const result = input.validateUserInput(inputData);
      expect(result).toEqual([
        'Username must be between 3 and 20 characters',
        'Email is invalid',
        'Password must be between 6 and 40 characters',
      ]);
    })

    it('should return an array of errors for invalid password', () => {
      const inputData: input.UserInput = {
        username: 'Abc',
        email: 'abc@gmail.com',
        password: 'abc123',
      };
      const result = input.validateUserInput(inputData);
      expect(result).toEqual([
        'Password must contain at least one uppercase letter',
      ]);
    })
  })
})