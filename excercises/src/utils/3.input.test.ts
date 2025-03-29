import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateUserInput,
  type UserInput,
} from "./3.input";

describe("input", () => {
  describe(".validateUsername", () => {
    it("should return error when username is empty", () => {
      expect(validateUsername("")).toBe("Username is required");
      expect(validateUsername("   ")).toBe("Username is required");
    });

    it("should return error when username is too short", () => {
      expect(validateUsername("ab")).toBe(
        "Username must be between 3 and 20 characters"
      );
    });

    it("should return error when username is too long", () => {
      expect(validateUsername("abcdefghijklmnopqrstuvwxyz")).toBe(
        "Username must be between 3 and 20 characters"
      );
    });

    it("should return empty string for valid username", () => {
      expect(validateUsername("user123")).toBe("");
      expect(validateUsername("valid_username")).toBe("");
    });
  });

  describe(".validateEmail", () => {
    it("should return error when email is empty", () => {
      expect(validateEmail("")).toBe("Email is required");
    });

    it("should return error when email format is invalid", () => {
      expect(validateEmail("notanemail")).toBe("Email is invalid");
      expect(validateEmail("missing@tld")).toBe("Email is invalid");
      expect(validateEmail("@nodomain.com")).toBe("Email is invalid");
    });

    it("should return empty string for valid email", () => {
      expect(validateEmail("test@example.com")).toBe("");
      expect(validateEmail("user.name+tag@domain.co.uk")).toBe("");
    });
  });

  describe(".validatePassword", () => {
    it("should return error when password is empty", () => {
      expect(validatePassword("")).toBe("Password is required");
    });

    it("should return error when password is too short", () => {
      expect(validatePassword("Ab1")).toBe(
        "Password must be between 6 and 40 characters"
      );
    });

    it("should return error when password is too long", () => {
      const longPassword = "A" + "a".repeat(40);
      expect(validatePassword(longPassword)).toBe(
        "Password must be between 6 and 40 characters"
      );
    });

    it("should return error when password has no uppercase letter", () => {
      expect(validatePassword("password123")).toBe(
        "Password must contain at least one uppercase letter"
      );
    });

    it("should return empty string for valid password", () => {
      expect(validatePassword("ValidPassword123")).toEqual("");
    });
  });

  describe(".validateUserInput", () => {
    it("should return true when all inputs are valid", () => {
      const validInput: UserInput = {
        username: "validuser",
        email: "valid@example.com",
        password: "ValidPassword123",
      };
      expect(validateUserInput(validInput)).toBe(true);
    });

    it("should return array of errors when inputs are invalid", () => {
      const invalidInput: UserInput = {
        username: "",
        email: "invalid",
        password: "nouppercaseletter",
      };

      const result = validateUserInput(invalidInput);
      expect(Array.isArray(result)).toBe(true);
      expect(result).not.toBe(true);

      if (result !== true) {
        expect(result).toContain("Username is required");
        expect(result).toContain("Email is invalid");
        expect(result).toContain(
          "Password must contain at least one uppercase letter"
        );
      }
    });

    it("should collect all validation errors", () => {
      const emptyInput: UserInput = {
        username: "",
        email: "",
        password: "",
      };

      const result = validateUserInput(emptyInput);
      expect(Array.isArray(result)).toBe(true);
      expect(result).not.toBe(true);

      if (result !== true) {
        expect(result).toContain("Username is required");
        expect(result).toContain("Email is required");
        expect(result).toContain("Password is required");
      }
    });
  });
});
