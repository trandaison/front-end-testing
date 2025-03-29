import { validateUserInput } from './3.input'
import { describe, it, expect } from 'vitest';

describe('validateUserInput', () => {
  it('Username - Email - Password is required', () => {
    const input = {
      username: "",
      email: "",
      password: ""
    }

    const errorResult = [
      "Username is required",
      "Email is required",
      "Password is required",
      "Password must contain at least one uppercase letter"
    ]
    expect(validateUserInput(input)).toStrictEqual(errorResult)
  })

  it('Username < 3 & email & pass < 6', () => {
    const input = {
      username: "12",
      email: "email",
      password: "passS"
    }

    const errorResult = [
      "Username must be between 3 and 20 characters",
      "Email is invalid",
      "Password must be between 6 and 40 characters",
    ]
    expect(validateUserInput(input)).toStrictEqual(errorResult)
  })

  it('Username > 20 & email valid & pass > 40', () => {
    const input = {
      username: "usernameusernameusernameusernameusernameusernameusername",
      email: "email@gmail.com",
      password: "Spasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
    }

    const errorResult = [
      "Username must be between 3 and 20 characters",
      "Password must be between 6 and 40 characters",
    ]
    expect(validateUserInput(input)).toStrictEqual(errorResult)
  })

  it('Username > 20 & email valid & pass > 40 & pass !A-Z', () => {
    const input = {
      username: "usernameusernameusernameusernameusernameusernameusername",
      email: "email@gmail.com",
      password: "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
    }

    const errorResult = [
      "Username must be between 3 and 20 characters",
      "Password must be between 6 and 40 characters",
      "Password must contain at least one uppercase letter"
    ]
    expect(validateUserInput(input)).toStrictEqual(errorResult)
  })
  it('Username > 20 & email valid & pass < 6 & pass !A-Z', () => {
    const input = {
      username: "usernameusernameusernameusernameusernameusernameusername",
      email: "email@gmail.com",
      password: "pass"
    }

    const errorResult = [
      "Username must be between 3 and 20 characters",
      "Password must be between 6 and 40 characters",
      "Password must contain at least one uppercase letter"
    ]
    expect(validateUserInput(input)).toStrictEqual(errorResult)
  })

  it('Username valid & email valid & pass valid', () => {
    const input = {
      username: "username",
      email: "email@gmail.com",
      password: "passwordD"
    }

    expect(validateUserInput(input)).toBe(true)
  })
})