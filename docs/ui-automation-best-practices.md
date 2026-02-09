# UI Test Automation Best Practices

This doc maps **[BlazeMeter’s Top 15 UI Test Automation Best Practices](https://www.blazemeter.com/blog/ui-test-automation)** to this Playwright framework so we stay aligned with industry guidance.

---

## 1. Do not rely ONLY on UI test automation

**Idea:** Follow the test pyramid (unit → API → UI). UI should be the “third shield”; most bugs should be caught by API/unit tests.

**In this framework:**

- **API tests** (`tests/api/`) — run first, no browser, fast. Cover status, headers, JSON, CRUD.
- **Integration** (`tests/integration/`) — API + UI in one flow where it adds value.
- **E2E/UI** (`tests/e2e/`, `tests/visual/`) — only what must be verified in the browser.

Prefer adding coverage in `tests/api/` or integration before adding more UI-only tests.

---

## 2. Consider using a BDD framework

**Idea:** BDD (e.g. Gherkin/Cucumber) improves readability and shared understanding; optional “steps” or Given/When/Then structure.

**In this framework:**

- We don’t use Gherkin by default. You can add `@cucumber/playwright` or similar if you want.
- You can still use **BDD-style structure** in test names and `test.describe`:
  - `test.describe('Login', () => { test('Given valid user, when login, then dashboard is shown', ...) }`
- Keep **one logical scenario per test** and name it so the intent is clear (Given/When/Then in the title if it helps).

---

## 3. Always use test design patterns and principles

**Idea:** Page Object Model; avoid “Large Class”; consider steps/keywords; follow SOLID (e.g. Single Responsibility).

**In this framework:**

- **Page objects** in `page-objects/` (BasePage, LoginPage, etc.). Interact via page objects, not raw selectors in specs.
- **Locator strategy** in `docs/locator-strategy.md` — getByRole, getByLabel, etc.
- Keep each page object focused (one page or one logical area). Split large pages into smaller objects or “components” if they grow.
- **Steps/flows:** You can add a `flows/` or step helpers (e.g. `loginAs(user)`) that use page objects and reuse across specs.

---

## 4. NEVER use Thread.sleep() (or fixed timeouts)

**Idea:** No blind waits; use conditional waits so tests stay fast and stable.

**In this framework:**

- Playwright uses **auto-waiting** (waits for actionable state). Do **not** use `page.waitForTimeout()` unless there is a rare, documented reason.
- Prefer: `expect(locator).toBeVisible()`, `expect(locator).toBeEnabled()`, or letting actions (click, fill) wait automatically.
- Timeouts are configured in `config/env.ts` (navigation/action); override via `PW_NAVIGATION_TIMEOUT`, `PW_ACTION_TIMEOUT`.

---

## 5. Do not run ALL tests across ALL target browsers

**Idea:** Full suite on one browser; a smaller “browser compatibility” suite on others to save time.

**In this framework:**

- Default: Chromium + Firefox run the same tests (good for small suites).
- For larger suites, you can **split projects**: e.g. full suite on Chromium, and a subset (e.g. one E2E, one API, one visual) on Firefox. See optional setup in `playwright.config.ts` (commented) or use `--project=chromium` for daily runs and run Firefox only in CI on a tagged subset.

---

## 6. Separate tests from the test automation framework

**Idea:** Tests = what we verify; framework = how we drive the app (page objects, fixtures, utils).

**In this framework:**

- **Tests:** `tests/` only (e2e, api, integration, visual). Each file = test module; each `test()` = one scenario.
- **Framework:** `page-objects/`, `fixtures/`, `utils/`, `config/`, `constants/`, `data/`. No test logic inside framework code; framework exposes APIs used by tests.

---

## 7. Make the framework portable

**Idea:** Same repo runs anywhere (dev machine, CI); no local-only drivers or paths.

**In this framework:**

- Playwright installs browsers via `npx playwright install` (no manual driver management).
- Config and data live in the repo (`config/env.ts`, `data/*.json`). Override with env vars for different environments.
- `npm install` + `npx playwright install` (and optional `npm test`) are enough to run tests.

---

## 8. Name tests wisely

**Idea:** Test names should describe **what** is being verified so anyone can understand without opening the implementation.

**In this framework:**

- Use **self-descriptive** test names: e.g. `invalid login shows error`, `GET /login returns 200 and body contains Login`.
- Prefer behavior-focused: “user sees X after Y” rather than “test login” or “check button”.

---

## 9. Use soft assertions when useful

**Idea:** When one test checks several independent conditions, soft assertions let you see all failures instead of stopping at the first.

**In this framework:**

- Use **`expect.soft()`** for non-fatal checks in the same test. The test still fails at the end if any soft assertion failed.
- Example: multiple field validations in a form — use `expect.soft(field).toHaveValue(...)` for each, then one final check if needed.

---

## 10. Take screenshots for failure investigation

**Idea:** On failure, capture screenshots (and traces) so you can debug without re-running.

**In this framework:**

- `playwright.config.ts`: `screenshot: 'only-on-failure'`, `trace: 'on-first-retry'`.
- Output: `reports/screenshots`, HTML report in `reports/playwright-report/`.

---

## 11. Make tests simpler instead of adding comments

**Idea:** Clear code over long comments; extract helpers or page methods if the test is hard to read.

**In this framework:**

- Keep test bodies short: arrange (navigate, setup) → act (click, fill) → assert.
- Move complex setup or repeated steps into fixtures, page object methods, or small helpers in `utils/`.

---

## 12. Follow the “green tests run” policy

**Idea:** Fix or quarantine flaky/failing tests; don’t let red builds become normal.

**In this framework:**

- Fix failing tests or temporarily use `test.skip()` with a ticket/comment. Prefer fixing.
- Use `retries` only in CI (configured in `playwright.config.ts`) to absorb rare flakiness, not to hide real failures.

---

## 13. Use data-driven tests instead of repeated tests

**Idea:** One test, multiple inputs (e.g. from JSON or arrays) instead of copy-pasting the same test.

**In this framework:**

- **Data:** `data/users.json`, `data/api-endpoints.json` for payloads and endpoints.
- Use **`test.describe.each()`** or a loop over data to run the same scenario with different inputs (see data-driven example in `tests/e2e/login.spec.ts` or HOWTO).

---

## 14. All tests should be independent

**Idea:** No shared state; order doesn’t matter; any subset can run in isolation.

**In this framework:**

- Playwright gives each test a **fresh context** (default). No shared browser state between tests.
- Don’t rely on test order or data left by another test. Use fixtures for setup (e.g. auth) when needed.

---

## 15. Set up detailed test reporting

**Idea:** Clear reports so the team can see what failed and where.

**In this framework:**

- **List reporter** — console output.
- **HTML report** — `reports/playwright-report/index.html` (open after run).
- **Screenshots** — on failure in `reports/screenshots`.
- **Traces** — on first retry; open with Playwright trace viewer.

---

## Summary

| #   | Practice                      | Our approach                                  |
| --- | ----------------------------- | --------------------------------------------- |
| 1   | Don’t rely only on UI         | API + integration + UI; pyramid in `tests/`   |
| 2   | BDD                           | Optional; BDD-style names/describe            |
| 3   | Design patterns (POM, SOLID)  | Page objects, locator strategy, small classes |
| 4   | No sleep                      | Auto-waiting; no waitForTimeout               |
| 5   | Not all tests on all browsers | Optional project split (full vs compat)       |
| 6   | Separate tests from framework | `tests/` vs rest                              |
| 7   | Portable                      | Playwright install; env-based config          |
| 8   | Name tests wisely             | Self-descriptive, behavior-focused            |
| 9   | Soft assertions               | `expect.soft()` where useful                  |
| 10  | Screenshots on failure        | Configured                                    |
| 11  | Simpler tests over comments   | Short tests; helpers/page objects             |
| 12  | Green policy                  | Fix or skip with reason; retries only in CI   |
| 13  | Data-driven                   | data/ + describe.each or loop                 |
| 14  | Independent tests             | Fresh context; no shared state                |
| 15  | Detailed reporting            | List + HTML report + screenshots + trace      |
