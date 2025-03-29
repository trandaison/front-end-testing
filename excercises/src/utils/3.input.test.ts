import * as ValidateUserInput from "./3.input";
import { describe, it, expect } from "vitest";

describe("validateUserInput", () => {
  it("should return true for valid input", () => {
    const userInput = {
      username: 'validUser',
      email: 'email@gmail.com',
      password: 'ValidPassword123'
    }

    const result = ValidateUserInput.validateUserInput(userInput);
    expect(result).toBe(true);
  });

  it("should return an array of errors for invalid input", () => {
    const userInput = {
      username: 'ab',
      email: 'invalidEmail',
      password: 'short'
    }

    const result = ValidateUserInput.validateUserInput(userInput);
    expect(result).toEqual([
      "Username must be between 3 and 20 characters",
      "Email is invalid",
      "Password must be between 6 and 40 characters",
      "Password must contain at least one uppercase letter",
    ]);
  });

  it("should return an array of errors for empty input", () => {
    const userInput = {
      username: '',
      email: '',
      password: ''
    }

    const result = ValidateUserInput.validateUserInput(userInput);
    expect(result).toEqual([
      "Username is required",
      "Email is required",
      "Password is required",
      "Password must contain at least one uppercase letter",
    ]);
  });

  it("should return an array of errors for input with only whitespace", () => {
    const userInput = {
      username: '   ',
      email: '   ',
      password: '   '
    }

    const result = ValidateUserInput.validateUserInput(userInput);
    expect(result).toEqual([
      "Username is required",
      "Email is invalid",
      "Password must be between 6 and 40 characters",
      "Password must contain at least one uppercase letter",
    ]);
  });
});