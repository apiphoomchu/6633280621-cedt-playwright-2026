import { expect, type Page } from "@playwright/test";

import type { AppointmentData } from "./MakeAppointmentPage";

export class AppointmentConfirmationPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole("heading", { name: "Appointment Confirmation", level: 2 })).toBeVisible();
  }

  async expectAppointmentDetails(data: AppointmentData): Promise<void> {
    await expect(this.page.locator("#facility")).toHaveText(data.facility);
    await expect(this.page.locator("#hospital_readmission")).toHaveText(data.readmission ? "Yes" : "No");
    await expect(this.page.locator("#program")).toHaveText(data.program);
    await expect(this.page.locator("#visit_date")).toHaveText(data.visitDate);
    await expect(this.page.locator("#comment")).toHaveText(data.comment);
  }
}
