import { validateUserInput } from "./3.input";

describe("input", () => {
  describe(".validateUserInput", () => {
    it("should return true if input is valid", () => {
      const userInput = {
        username: "john_doe",
        email: "jont@gmail.com",
        password: "Password123",
      };

      expect(validateUserInput(userInput)).toBe(true);
    });

    it("should return errors if input username is only space", () => {
      const userInput = {
        username: " ",
        email: "jont@gmail.com",
        password: "Password123",
      };

      const result = validateUserInput(userInput);
      expect(result).toEqual(["Username is required"]);
    });

    it("should return errors if input username is less than 3 characters", () => {
      const userInput = {
        username: "su",
        email: "jont@gmail.com",
        password: "Password123",
      };

      const result = validateUserInput(userInput);
      expect(result).toEqual(["Username must be between 3 and 20 characters"]);
    });

    it("should return errors if input username is more than 20 characters", () => {
      const userInput = {
        username: "a".repeat(21),
        email: "jont@gmail.com",
        password: "Password123",
      };

      const result = validateUserInput(userInput);
      expect(result).toEqual(["Username must be between 3 and 20 characters"]);
    });

    it("should return errors if input email is empty", () => {
      const userInput = {
        username: "john_doe",
        email: "",
        password: "Password123",
      };

      const result = validateUserInput(userInput);
      expect(result).toEqual(["Email is required"]);
    });

    it("should return errors if input email is invalid", () => {
      const userInput = {
        username: "john_doe",
        email: "invalid-email",
        password: "Password123",
      };

      const result = validateUserInput(userInput);
      expect(result).toEqual(["Email is invalid"]);
    });

    it("should return errors if input password is empty", () => {
      const userInput = {
        username: "john_doe",
        email: "jont@gmail.com",
        password: "",
      };

      const result = validateUserInput(userInput);
      expect(result).toContain("Password is required");
    });

    it("should return errors if input password is less than 6 characters", () => {
      const userInput = {
        username: "john_doe",
        email: "jont@gmail.com",
        password: "12345",
      };

      const result = validateUserInput(userInput);
      expect(result).toContain("Password must be between 6 and 40 characters");
    });

    it("should return errors if input password is more than 40 characters", () => {
      const userInput = {
        username: "john_doe",
        email: "jont@gmail.com",
        password: "A".repeat(41),
      };

      const result = validateUserInput(userInput);
      expect(result).toEqual(["Password must be between 6 and 40 characters"]);
    });

    it("should return errors if input password does not contain uppercase letter", () => {
      const userInput = {
        username: "john_doe",
        email: "jont@gmail.com",
        password: "password123",
      };

      const result = validateUserInput(userInput);
      expect(result).toEqual(["Password must contain at least one uppercase letter"]);
    });
  });
});
