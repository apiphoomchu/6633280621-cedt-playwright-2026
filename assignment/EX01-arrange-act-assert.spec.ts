import { test, expect } from "@playwright/test";

const URL = "https://katalon-demo-cura.herokuapp.com";
const VALID = { username: "John Doe", password: "ThisIsNotAPassword" };
const WRONG_PASSWORD = { username: "John Doe", password: "WrongPassword123" };
const WRONG_USERNAME = { username: "UnknownUser", password: "ThisIsNotAPassword" };

async function goToLoginPage(page: import("@playwright/test").Page) {
  await page.goto(URL);
  await page.getByRole("link", { name: "Make Appointment" }).click();
}

test.describe("Login - Arrange Act Assert", () => {
  test("Login - Valid credentials - Arrange Act Assert", async ({ page }) => {
    await test.step("Arrange", async () => {
      await goToLoginPage(page);
    });

    await test.step("Act", async () => {
      await page.getByLabel("Username").fill(VALID.username);
      await page.getByLabel("Password").fill(VALID.password);
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
      await page.getByLabel("Username").fill(WRONG_PASSWORD.username);
      await page.getByLabel("Password").fill(WRONG_PASSWORD.password);
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
      await page.getByLabel("Username").fill(WRONG_USERNAME.username);
      await page.getByLabel("Password").fill(WRONG_USERNAME.password);
      await page.getByRole("button", { name: "Login" }).click();
    });

    await test.step("Assert", async () => {
      await expect(
        page.getByText("Login failed! Please ensure the username and password are valid."),
      ).toBeVisible();
    });
  });
});
