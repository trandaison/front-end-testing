export interface UserInput {
  username: string;
  email: string;
  password: string;
}

interface ValidationRule {
  validate: (value: string) => boolean;
  errorMessage: string;
}

type ValidationRules = {
  [K in keyof UserInput]: ValidationRule[];
};

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 40;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const UPPERCASE_REGEX = /[A-Z]/;

const validationRules: ValidationRules = {
  username: [
    {
      validate: (value) => !!value.trim(),
      errorMessage: 'Username is required'
    },
    {
      validate: (value) => {
        const trimmed = value.trim();
        return trimmed.length >= USERNAME_MIN_LENGTH && trimmed.length <= USERNAME_MAX_LENGTH;
      },
      errorMessage: `Username must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters`
    }
  ],
  email: [
    {
      validate: (value) => !!value,
      errorMessage: 'Email is required'
    },
    {
      validate: (value) => EMAIL_REGEX.test(value),
      errorMessage: 'Email is invalid'
    }
  ],
  password: [
    {
      validate: (value) => !!value,
      errorMessage: 'Password is required'
    },
    {
      validate: (value) => value.length >= PASSWORD_MIN_LENGTH && value.length <= PASSWORD_MAX_LENGTH,
      errorMessage: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters`
    },
    {
      validate: (value) => UPPERCASE_REGEX.test(value),
      errorMessage: 'Password must contain at least one uppercase letter'
    }
  ]
};

export function validateUserInput(input: UserInput): true | string[] {
  const errors: string[] = [];

  Object.entries(validationRules).forEach(([field, rules]) => {
    const value = input[field as keyof UserInput];
    
    let requiredPassed = true;
    
    for (const rule of rules) {
      if (!requiredPassed && rule.errorMessage.indexOf('required') === -1) {
        continue;
      }
      
      if (!rule.validate(value)) {
        errors.push(rule.errorMessage);
        
        if (rule.errorMessage.indexOf('required') !== -1) {
          requiredPassed = false;
        }
      }
    }
  });

  return errors.length > 0 ? errors : true;
}