import { expect, type Page } from "@playwright/test";

export type HealthcareProgram = "Medicaid" | "Medicare" | "None";

export type AppointmentData = {
  facility: string;
  readmission: boolean;
  program: HealthcareProgram;
  visitDate: string;
  comment: string;
};

export class MakeAppointmentPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole("heading", { name: "Make Appointment", level: 2 })).toBeVisible();
  }

  async bookAppointment(data: AppointmentData): Promise<void> {
    await this.page.getByLabel("Facility").selectOption(data.facility);

    const readmissionCheckbox = this.page.locator("#chk_hospotal_readmission");
    if (data.readmission) {
      await readmissionCheckbox.check();
    } else {
      await readmissionCheckbox.uncheck();
    }

    await this.page.getByLabel(data.program).check();
    const dayOfMonth = String(Number.parseInt(data.visitDate.split("/")[0], 10));
    await this.page.locator("#txt_visit_date").click();
    await this.page
      .locator(".datepicker-days td.day:not(.old):not(.new)", { hasText: new RegExp(`^${dayOfMonth}$`) })
      .first()
      .click();
    await this.page.getByRole("textbox", { name: "Comment" }).fill(data.comment);
    await this.page.getByRole("button", { name: "Book Appointment" }).click();
  }
}
