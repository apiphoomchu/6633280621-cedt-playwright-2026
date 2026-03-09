import { test } from "@playwright/test";

import { VALID_CREDENTIALS } from "./constants/credentials";
import { AppointmentConfirmationPage } from "./pages/AppointmentConfirmationPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { MakeAppointmentPage, type AppointmentData } from "./pages/MakeAppointmentPage";

function getTodayDDMMYYYY(): string {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

test.describe("EX03 - Page Object Model", () => {
  test("Make appointment success", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const makeAppointmentPage = new MakeAppointmentPage(page);
    const appointmentConfirmationPage = new AppointmentConfirmationPage(page);

    const appointment: AppointmentData = {
      facility: "Seoul CURA Healthcare Center",
      readmission: true,
      program: "Medicaid",
      visitDate: getTodayDDMMYYYY(),
      comment: "Appointment created with POM test",
    };

    await homePage.open();
    await homePage.clickMakeAppointment();
    await loginPage.login(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password);
    await makeAppointmentPage.expectLoaded();
    await makeAppointmentPage.bookAppointment(appointment);
    await appointmentConfirmationPage.expectLoaded();
    await appointmentConfirmationPage.expectAppointmentDetails(appointment);
  });
});
