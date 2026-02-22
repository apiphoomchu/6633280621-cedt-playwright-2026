import { test as base, expect, type Page } from "@playwright/test";

const URL = "https://katalon-demo-cura.herokuapp.com";
const VALID = { username: "John Doe", password: "ThisIsNotAPassword" };

function getTodayDDMMYYYY(): string {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

const test = base.extend<{ loggedIn: Page }>({
  loggedIn: async ({ page }, use) => {
    await page.goto(URL);
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await page.getByLabel("Username").fill(VALID.username);
    await page.getByLabel("Password").fill(VALID.password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("heading", { name: "Make Appointment", level: 2 })).toBeVisible();
    await use(page);
  },
});

test.describe("Assertions for the booking flow (Arrange, Act, Assert)", () => {
  test("Make Appointment h2 heading is shown", async ({ loggedIn: page }) => {
    await expect(page.getByRole("heading", { name: "Make Appointment", level: 2 })).toHaveText(
      "Make Appointment",
    );
  });

  test("Facility dropdown lists expected options", async ({ loggedIn: page }) => {
    const select = page.getByLabel("Facility");
    for (const facility of [
      "Tokyo CURA Healthcare Center",
      "Hongkong CURA Healthcare Center",
      "Seoul CURA Healthcare Center",
    ]) {
      await select.selectOption(facility);
      await expect(select).toHaveValue(facility);
    }
  });

  test("Hospital readmission checkbox can be checked", async ({ loggedIn: page }) => {
    const checkbox = page.locator("#chk_hospotal_readmission");
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test("Healthcare program radio options work", async ({ loggedIn: page }) => {
    for (const program of ["Medicaid", "Medicare", "None"]) {
      await page.getByLabel(program).check();
      await expect(page.getByLabel(program)).toBeChecked();
    }
  });

  test("Visit date field accepts and keeps today's date", async ({ loggedIn: page }) => {
    const today = getTodayDDMMYYYY();
    await page.locator("#txt_visit_date").fill(today);
    await expect(page.locator("#txt_visit_date")).toHaveValue(today);
  });

  test("Comment field keeps entered text", async ({ loggedIn: page }) => {
    const msg = "Sample note to verify the input assertion";
    await page.getByRole("textbox", { name: "Comment" }).fill(msg);
    await expect(page.getByRole("textbox", { name: "Comment" })).toHaveValue(msg);
  });

  test("Book Appointment button is visible and enabled", async ({ loggedIn: page }) => {
    const btn = page.getByRole("button", { name: "Book Appointment" });
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });
});
