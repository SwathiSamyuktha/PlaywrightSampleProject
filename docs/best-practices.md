# Best Practices (Playwright + This Framework)

See also **docs/ui-automation-best-practices.md** for the full BlazeMeter-aligned checklist.

## 1. Test pyramid

- Prefer **API tests** (`tests/api/`) over UI when the same behavior can be verified without a browser.
- Use **integration** (`tests/integration/`) for API + UI flows. Use **E2E/UI** only for what must be verified in the browser.
- Don’t duplicate in UI what is already covered by API or integration.

## 2. Locators

- **Prefer official locator order:** getByRole → getByText → getByLabel → getByPlaceholder → getByAltText → getByTitle → getByTestId. See [docs/locator-strategy.md](./locator-strategy.md).
- Avoid long CSS/XPath chains; use `LocatorHelper` / `page.getByRole()` and `page.getByLabel()` in new code.

## 3. Waiting

- **Rely on auto-waiting:** Playwright waits for elements to be actionable. Avoid `page.waitForTimeout()`; use `expect(locator).toBeVisible()` or actionability.
- For network: use `page.waitForResponse()` or `request` fixture for API when needed.

## 4. Configuration

- **Single config:** All settings in `config/env.ts`; override with env vars (`BASE_URL`, `API_BASE_URL`, `PW_NAVIGATION_TIMEOUT`, `PW_ACTION_TIMEOUT`). Root `playwright.config.ts` uses it.

## 5. Tests

- **Isolation:** Each test gets a fresh context (default). No shared state between tests.
- **One logical scenario per test:** Name tests by behavior; use self-descriptive names (see BlazeMeter #8).
- **Trace/screenshots:** Trace on first retry, screenshot only on failure (configured in `playwright.config.ts`).
- **Soft assertions:** Use `expect.soft()` when one test checks several independent conditions so all failures are reported.
- **Data-driven:** Use `data/*.json` and a loop (or parametrized pattern) instead of copy-pasting tests (see `tests/e2e/login.spec.ts`).
- **Green policy:** Fix or temporarily skip failing tests; don’t let red become normal. Retries are for CI only.

## 6. Page objects

- **Composition:** Page objects own a WebDriver (or use Page + LocatorHelper). Prefer LocatorHelper + getByRole/getByLabel when possible.
- **No assertions in page objects:** Return state or elements; assert in tests.

## 7. API tests

- **Use request fixture:** No browser needed. Use `tests/api/` for pure API validations.
- **Validate status, headers, body:** Use the shared API validation helpers and examples in `tests/api/validations.spec.ts`.

## 8. API + UI integration

- **Mechanism:** Use `utils/api-ui` helpers to run API calls and assert the same data (or derived state) in the UI. See `tests/integration/api-ui.spec.ts`.

## 9. Constants

- Timeouts and base URLs are in `config/env.ts` (override with env vars). Shared constants and enums live in `constants/` (e.g. `TestConstants`, `HttpStatus`). No magic numbers in tests.
