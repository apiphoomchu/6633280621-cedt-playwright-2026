# 6633280621-cedt-playwright-2026

Playwright assignment for CEDT 2026: end-to-end tests for the [Katalon CURA Healthcare](https://katalon-demo-cura.herokuapp.com) demo app, covering **Arrange–Act–Assert** and **assertions** on the Make Appointment flow.

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **pnpm** (or npm/yarn)

---

## Setup

```bash
pnpm install
```

---

## Running tests

| Command | Description |
|--------|-------------|
| `pnpm run test` | Run all tests (headless, Chromium) |
| `pnpm run test:ui` | Run tests in Playwright UI mode |
| `pnpm run test:report` | Open the last HTML test report |

Default run:

```bash
pnpm run test
```

---

## Assignment structure

Tests live under `assignment/` and target **https://katalon-demo-cura.herokuapp.com**.

### EX01 – Arrange Act Assert (`EX01-arrange-act-assert.spec.ts`)

Login flow using explicit **Arrange → Act → Assert** steps:

- **Arrange:** Go to the site and open the login page (Make Appointment).
- **Act:** Fill username/password and click Login.
- **Assert:** Check success (Make Appointment heading) or failure (error message).

| Test | Description |
|------|-------------|
| Verify login pass with valid user | Valid credentials → Make Appointment page visible |
| Verify login fail with invalid password | Wrong password → login error message |
| Verify login fail with invalid username | Wrong username → login error message |

Valid demo credentials: `John Doe` / `ThisIsNotAPassword`.

### EX02 – Assertions (`EX02-assertion.spec.ts`)

Make Appointment form behavior after login. Uses a **custom fixture** `loggedIn` that navigates and logs in once per test.

| Test | Description |
|------|-------------|
| Make Appointment h2 heading is displayed | Heading text equals "Make Appointment" |
| Can select all facility combo box options | Tokyo, Hongkong, Seoul facilities selectable and value asserted |
| Can check the hospital readmission checkbox | Checkbox can be checked and is checked |
| Can select each healthcare program radio button | Medicaid, Medicare, None selectable and checked |
| Can input today's date in Visit Date field | Visit date accepts today (DD/MM/YYYY) and value asserted |
| Can input a comment | Comment textbox accepts input and value asserted |
| Book Appointment button is visible and enabled | Button is visible and enabled |

---

## Configuration

- **Config:** `playwright.config.ts`
- **Test directory:** `./assignment`
- **Browser:** Chromium (Desktop Chrome)
- **Timeouts:** action 10s, navigation 30s
- **Artifacts:** trace on first retry, screenshot and video on failure
- **CI:** retries 2, 1 worker, HTML reporter

---

## Sample test result

```text
playwright test

Running 10 tests using 4 workers
  ✓   1 [chromium] › assignment/EX01-arrange-act-assert.spec.ts:48:7 › Login - Arrange Act Assert › Verify login fail with invalid username (9.3s)
  ✓   2 [chromium] › assignment/EX02-assertion.spec.ts:27:3 › Assertion - Make Appointment page › Make Appointment h2 heading is displayed (6.7s)
  ✓   3 [chromium] › assignment/EX01-arrange-act-assert.spec.ts:14:7 › Login - Arrange Act Assert › Verify login pass with valid user (13.5s)
  ✓   4 [chromium] › assignment/EX01-arrange-act-assert.spec.ts:30:7 › Login - Arrange Act Assert › Verify login fail with invalid password (24.7s)
  ✓   5 [chromium] › assignment/EX02-assertion.spec.ts:33:3 › Assertion - Make Appointment page › Can select all facility combo box options (4.0s)
  ✓   6 [chromium] › assignment/EX02-assertion.spec.ts:45:3 › Assertion - Make Appointment page › Can check the hospital readmission checkbox (9.1s)
  ✓   7 [chromium] › assignment/EX02-assertion.spec.ts:51:3 › Assertion - Make Appointment page › Can select each healthcare program radio button (5.8s)
  ✓   8 [chromium] › assignment/EX02-assertion.spec.ts:58:3 › Assertion - Make Appointment page › Can input today's date in Visit Date field (6.0s)
  ✓   9 [chromium] › assignment/EX02-assertion.spec.ts:64:3 › Assertion - Make Appointment page › Can input a comment (9.2s)
  ✓  10 [chromium] › assignment/EX02-assertion.spec.ts:70:3 › Assertion - Make Appointment page › Book Appointment button is visible and enabled (3.9s)
```

---

## Tech stack

- **@playwright/test** ^1.58.2
- TypeScript
- pnpm
