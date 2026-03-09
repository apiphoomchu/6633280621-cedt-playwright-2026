export const VALID_CREDENTIALS = {
  username: "John Doe",
  password: "ThisIsNotAPassword",
} as const;

export const INVALID_PASSWORD_CREDENTIALS = {
  username: "John Doe",
  password: "WrongPassword123",
} as const;

export const INVALID_USERNAME_CREDENTIALS = {
  username: "UnknownUser",
  password: "ThisIsNotAPassword",
} as const;
