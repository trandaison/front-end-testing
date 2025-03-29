import * as inputFile from './3.input';

describe('input', () => {
  describe('.validateUsername', () => {
    it('should return empty array for valid usernames', () => {
      expect(inputFile.validateUsername('validuser')).toEqual([]);
      expect(inputFile.validateUsername('user123')).toEqual([]);
      expect(inputFile.validateUsername('valid_user_name')).toEqual([]);
      expect(inputFile.validateUsername('exactlytwentycharss')).toEqual([]);
    });

    it('should validate username length between 3 and 20 characters', () => {
      expect(inputFile.validateUsername('ab')).toEqual(['Username must be between 3 and 20 characters']);
      expect(inputFile.validateUsername('a')).toEqual(['Username must be between 3 and 20 characters']);
      expect(inputFile.validateUsername('thisusernameiswaytoolongtobevalid')).toEqual(['Username must be between 3 and 20 characters']);
    });

    it('should validate required username field', () => {
      expect(inputFile.validateUsername('')).toEqual(['Username is required']);
    });

    it('should handle whitespace trimming correctly', () => {
      expect(inputFile.validateUsername('  validuser  ')).toEqual([]);
      expect(inputFile.validateUsername('   ')).toEqual(['Username is required']);
      expect(inputFile.validateUsername(' abc ')).toEqual([]);
      expect(inputFile.validateUsername(' ab ')).toEqual(['Username must be between 3 and 20 characters']);
    });

    it('should handle edge cases', () => {
      expect(inputFile.validateUsername('abc')).toEqual([]);
      expect(inputFile.validateUsername('12345678901234567890')).toEqual([]);
    });
  });

  describe('.validateEmail', () => {
    it('should return empty array for valid emails', () => {
      expect(inputFile.validateEmail('user@example.com')).toEqual([]);
      expect(inputFile.validateEmail('user.name@example.com')).toEqual([]);
      expect(inputFile.validateEmail('user+tag@example.com')).toEqual([]);
      expect(inputFile.validateEmail('user@subdomain.example.com')).toEqual([]);
      expect(inputFile.validateEmail('user@example.co.uk')).toEqual([]);
    });

    it('should validate email is required', () => {
      expect(inputFile.validateEmail('')).toEqual(['Email is required']);
      expect(inputFile.validateEmail(undefined as any)).toEqual(['Email is required']);
      expect(inputFile.validateEmail(null as any)).toEqual(['Email is required']);
    });

    it('should validate email format', () => {
      expect(inputFile.validateEmail('userexample.com')).toEqual(['Email is invalid']); // Missing @
      expect(inputFile.validateEmail('user@examplecom')).toEqual(['Email is invalid']); // Missing dot
      expect(inputFile.validateEmail('user@.com')).toEqual(['Email is invalid']); // Missing domain
      expect(inputFile.validateEmail('@example.com')).toEqual(['Email is invalid']); // Missing username
      expect(inputFile.validateEmail('user@example.')).toEqual(['Email is invalid']); // TLD incomplete
      expect(inputFile.validateEmail('user@.example.com')).toEqual(['Email is invalid']); // Dot at wrong position
      expect(inputFile.validateEmail('user example@example.com')).toEqual(['Email is invalid']); // Space in username
    });

    it('should handle whitespace in emails', () => {
      expect(inputFile.validateEmail(' user@example.com ')).toEqual(['Email is invalid']); // Leading/trailing spaces
      expect(inputFile.validateEmail('user@example com')).toEqual(['Email is invalid']); // Space in domain
    });

    it('should handle special cases', () => {
      expect(inputFile.validateEmail('user@localhost')).toEqual(['Email is invalid']); // No TLD
      expect(inputFile.validateEmail('email@example')).toEqual(['Email is invalid']); // No TLD
    });
  });

  describe('.validatePassword', () => {
    it('should return empty array for valid passwords', () => {
      expect(inputFile.validatePassword('Password123')).toEqual([]);
      expect(inputFile.validatePassword('Abc123!')).toEqual([]);
      expect(inputFile.validatePassword('P@ssw0rd')).toEqual([]);
      expect(inputFile.validatePassword('ThisIsAValidPasswordWith40Characters!!!')).toEqual([]);
    });

    it('should validate password is required', () => {
      expect(inputFile.validatePassword('')).toEqual(['Password is required', 'Password must contain at least one uppercase letter']);
      expect(inputFile.validatePassword(undefined as any)).toEqual(['Password is required', 'Password must contain at least one uppercase letter']);
      expect(inputFile.validatePassword(null as any)).toEqual(['Password is required', 'Password must contain at least one uppercase letter']);
    });

    it('should validate password length', () => {
      expect(inputFile.validatePassword('Abcd1')).toEqual(['Password must be between 6 and 40 characters']);

      const tooLongPassword = 'A' + 'a'.repeat(40);
      expect(inputFile.validatePassword(tooLongPassword)).toEqual(['Password must be between 6 and 40 characters']);
    });

    it('should validate uppercase letter requirement', () => {
      expect(inputFile.validatePassword('password123')).toEqual(['Password must contain at least one uppercase letter']);
      expect(inputFile.validatePassword('all_lowercase_123')).toEqual(['Password must contain at least one uppercase letter']);
      expect(inputFile.validatePassword('123456789')).toEqual(['Password must contain at least one uppercase letter']);
    });

    it('should validate both length and uppercase together', () => {
      // Too short and no uppercase
      expect(inputFile.validatePassword('abc12')).toEqual([
        'Password must be between 6 and 40 characters',
        'Password must contain at least one uppercase letter',
      ]);

      // Too long and no uppercase
      const tooLongLowercasePassword = 'a'.repeat(41);
      expect(inputFile.validatePassword(tooLongLowercasePassword)).toEqual([
        'Password must be between 6 and 40 characters',
        'Password must contain at least one uppercase letter',
      ]);
    });

    it('should handle edge cases', () => {
      // Exactly 6 characters with uppercase
      expect(inputFile.validatePassword('Abcde1')).toEqual([]);

      // Exactly 40 characters with uppercase
      const exactLengthPassword = 'A' + 'a'.repeat(39);
      expect(inputFile.validatePassword(exactLengthPassword)).toEqual([]);

      // Valid length but no uppercase
      expect(inputFile.validatePassword('abcdef')).toEqual(['Password must contain at least one uppercase letter']);
    });
  });

  describe('.validateUserInput', () => {
    it('should return true for valid input', () => {
      const validInput: inputFile.UserInput = {
        username: 'validuser',
        email: 'valid@example.com',
        password: 'ValidPassword123',
      };

      expect(inputFile.validateUserInput(validInput)).toBe(true);
    });

    it('should return error messages for invalid input', () => {
      const invalidInput: inputFile.UserInput = {
        username: '',
        email: '',
        password: '',
      };

      expect(inputFile.validateUserInput(invalidInput)).toEqual([
        'Username is required',
        'Email is required',
        'Password is required',
        'Password must contain at least one uppercase letter',
      ]);
    });
  });
});
