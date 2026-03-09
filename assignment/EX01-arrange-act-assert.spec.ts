import { test, expect } from "@playwright/test";
import {
  INVALID_PASSWORD_CREDENTIALS,
  INVALID_USERNAME_CREDENTIALS,
  VALID_CREDENTIALS,
} from "./constants/credentials";

async function goToLoginPage(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByRole("link", { name: "Make Appointment" }).click();
}

test.describe("Login - Arrange Act Assert", () => {
  test("Login - Valid credentials - Arrange Act Assert", async ({ page }) => {
    await test.step("Arrange", async () => {
      await goToLoginPage(page);
    });

    await test.step("Act", async () => {
      await page.getByLabel("Username").fill(VALID_CREDENTIALS.username);
      await page.getByLabel("Password").fill(VALID_CREDENTIALS.password);
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Assert", async () => {
      await expect(page.getByRole("heading", { name: "Make Appointment", level: 2 })).toBeVisible();
    });
  });

  test("Login - Invalid password - Arrange Act Assert", async ({ page }) => {
    await test.step("Arrange", async () => {
      await goToLoginPage(page);
    });

    await test.step("Act", async () => {
      await page.getByLabel("Username").fill(INVALID_PASSWORD_CREDENTIALS.username);
      await page.getByLabel("Password").fill(INVALID_PASSWORD_CREDENTIALS.password);
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Assert", async () => {
      await expect(
        page.getByText("Login failed! Please ensure the username and password are valid."),
      ).toBeVisible();
    });
  });

  test("Login - Invalid username - Arrange Act Assert", async ({ page }) => {
    await test.step("Arrange", async () => {
      await goToLoginPage(page);
    });

    await test.step("Act", async () => {
      await page.getByLabel("Username").fill(INVALID_USERNAME_CREDENTIALS.username);
      await page.getByLabel("Password").fill(INVALID_USERNAME_CREDENTIALS.password);
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Assert", async () => {
      await expect(
        page.getByText("Login failed! Please ensure the username and password are valid."),
      ).toBeVisible();
    });
  });
});
