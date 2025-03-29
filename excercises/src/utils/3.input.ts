export type UserInput = {
  username: string;
  email: string;
  password: string;
};

// Validation constraints
const VALIDATION_RULES = {
  username: {
    minLength: 3,
    maxLength: 20,
  },
  password: {
    minLength: 6,
    maxLength: 40,
  },
  email: {
    // More comprehensive email regex pattern
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
};

// Error messages
const ERROR_MESSAGES = {
  username: {
    required: "Username is required",
    length: `Username must be between ${VALIDATION_RULES.username.minLength} and ${VALIDATION_RULES.username.maxLength} characters`,
  },
  email: {
    required: "Email is required",
    invalid: "Email is invalid",
  },
  password: {
    required: "Password is required",
    length: `Password must be between ${VALIDATION_RULES.password.minLength} and ${VALIDATION_RULES.password.maxLength} characters`,
    uppercase: "Password must contain at least one uppercase letter",
  },
};

export function validateUsername(username: string): string {
  const trimmedUsername = username.trim();

  if (!trimmedUsername) {
    return ERROR_MESSAGES.username.required;
  }

  if (
    trimmedUsername.length < VALIDATION_RULES.username.minLength ||
    trimmedUsername.length > VALIDATION_RULES.username.maxLength
  ) {
    return ERROR_MESSAGES.username.length;
  }

  return "";
}

export function validateEmail(email: string): string {
  if (!email) {
    return ERROR_MESSAGES.email.required;
  }
  if (!VALIDATION_RULES.email.pattern.test(email)) {
    return ERROR_MESSAGES.email.invalid;
  }

  return "";
}

export function validatePassword(password: string) {
  if (!password) {
    return ERROR_MESSAGES.password.required;
  }

  if (
    password.length < VALIDATION_RULES.password.minLength ||
    password.length > VALIDATION_RULES.password.maxLength
  ) {
    return ERROR_MESSAGES.password.length;
  }

  if (!/[A-Z]/.test(password)) {
    return ERROR_MESSAGES.password.uppercase;
  }

  return "";
}

export function validateUserInput(input: UserInput): true | string[] {
  const { username, email, password } = input;

  const usernameErrors = validateUsername(username);
  const emailErrors = validateEmail(email);
  const passwordErrors = validatePassword(password);

  const allErrors = [usernameErrors, emailErrors, passwordErrors].filter(
    Boolean
  );

  return allErrors.length > 0 ? allErrors : true;
}
