# How to use this framework

Step-by-step guides for common tasks.

---

## How to run tests

**Important:** Run `npm test` with **no extra words**. If you run `npm run test playwright` or `npm test something`, Playwright treats that as a filter and looks for tests matching "playwright" or "something" — you’ll get **"No tests found"**. To open the interactive UI, use `npm run test:ui` (not `npm test --ui`).

- **All tests:**  
  `npm test`

- **Only E2E (UI):**  
  `npm run test:e2e`

- **Only API:**  
  `npm run test:api`

- **Only API–UI integration:**  
  `npm run test:integration`

- **With browser visible:**  
  `npm run test:headed`

- **Interactive UI:**  
  `npm run test:ui`

---

## How to change the base URL or API URL

- Set environment variables before running tests:
  - `BASE_URL` — used for UI and for the `request` fixture (e.g. `https://the-internet.herokuapp.com`).
  - `API_BASE_URL` — used in API validation tests (e.g. `https://jsonplaceholder.typicode.com`).

- Example (PowerShell):  
  `$env:BASE_URL="https://my-app.example.com"; npm test`

- Example (bash):  
  `BASE_URL=https://my-app.example.com npm test`

- Defaults are in `config/env.ts`. You can also change them there for local development.

---

## How to add a new E2E test

1. **If the flow uses an existing page:**
   - Open or create a spec under `tests/e2e/` (e.g. `tests/e2e/login.spec.ts`).
   - Import `test` and `expect` from `../../fixtures/base` or `../../fixtures/auth`.
   - Import page objects from `../../page-objects/` (e.g. `LoginPage` from `LoginPage`).
   - Use the fixture: `async ({ page, context, logger }) => { ... }`.
   - Create the driver and page object, then call methods and use `expect` for assertions.

2. **Example (add a new test in an existing spec):**

```ts
import { test, expect } from '../../fixtures/auth';
import { LoginPage } from '../../page-objects/LoginPage';

test.describe('Login (LoginTest)', () => {
  test('my new test', async ({ page, context, logger }) => {
    const driver = new PlaywrightWebDriver(page, context);
    const loginPage = new LoginPage(driver);
    await loginPage.goto('/login');
    // ... actions and expect(...)
  });
});
```

3. Run: `npm run test:e2e`

---

## How to add a new page object

1. **Create the page class** in `page-objects/` (e.g. `page-objects/MyPage.ts`).
   - Extend `PageObject`.
   - Implement `protected get baseSelector(): string` (e.g. a main container selector or `''`).
   - Add private getters or methods that use `this.driver` (e.g. `click(selector)`, `fill(selector, value)`, `getText(selector)`).
   - Prefer stable selectors; see `docs/locator-strategy.md`. For selector-based usage you keep using `this.driver`; for role/label-based locators you can use `LocatorHelper` with `this.driver.page`.

2. **Export it** from `page-objects/` if you add an index: `export { MyPage } from './MyPage';`

3. **Use it in a test** (same pattern as LoginPage): create `PlaywrightWebDriver(page, context)`, then `new MyPage(driver)` and call your methods.

---

## How to add a new API test

1. Open or create a spec under `tests/api/` (e.g. `tests/api/api.spec.ts` or a new file).
2. Import `test` and `expect` from `../../fixtures/base` or `../../fixtures/api`.
3. Use the `request` fixture: `async ({ request, logger }) => { ... }`.
4. Call `request.get(...)`, `request.post(...)`, etc. Use relative paths for the main app (they use `baseURL`) or full URLs for other APIs (e.g. `env.apiBaseURL` from `config/env`).
5. Assert with `expect(response.status()).toBe(200)` and similar; for JSON use `await response.json()` then assert on the object.

Example:

```ts
import { test, expect } from '../../fixtures/api';

test('GET /my-endpoint returns 200', async ({ request }) => {
  const res = await request.get('/my-endpoint');
  expect(res.status()).toBe(200);
});
```

Run: `npm run test:api`

---

## How to add an API–UI integration test

1. Open or create a spec under `tests/integration/` (e.g. `tests/integration/api-ui.spec.ts`).
2. Import `test`, `expect` from `../../fixtures/base`, and `fetchViaApi`, `assertApiAndUiConsistent` from `../../utils/api-ui`. Use page objects or `PlaywrightWebDriver` + `LoginPageWithDriver` for UI steps.
3. **Call the API first:**  
   `const apiContext = await fetchViaApi(request, '/some-path');`
4. **Assert on the API response:**  
   `assertApiAndUiConsistent(apiContext, { expectedStatus: 200, bodyShouldContain: 'Some text' });`
5. **Then open the same (or related) flow in the UI** and assert that the UI matches (e.g. same content, form visible).
6. Run: `npm run test:integration`

---

## How to use the locator strategy (getByRole, getByLabel, …)

- Read **docs/locator-strategy.md** for the recommended order (getByRole → getByText → getByLabel → …).
- In code, use **LocatorHelper** when you want to stick to that strategy:
  - Import: `import { createLocatorHelper } from '../../utils/LocatorHelper';`
  - In a test: `const loc = createLocatorHelper(page);` then e.g. `await loc.getByRole('button', { name: 'Submit' }).click();` or `await loc.getByLabel('Username').fill('user');`
- Prefer these over raw CSS/XPath so tests stay stable and readable.

---

## How to change timeouts

- **Navigation/action timeouts:**  
  Set `PW_NAVIGATION_TIMEOUT` and `PW_ACTION_TIMEOUT` (milliseconds) in the environment, or change the defaults in `config/env.ts`. The root `playwright.config.ts` uses these.

- **Test timeout:**  
  In a spec: `test('my test', async ({ ... }) => { ... });` and then `test.setTimeout(60000);` if needed, or configure `timeout` in `playwright.config.ts` for all tests.

---

## How to use soft assertions

- When one test checks several **independent** conditions, use **`expect.soft()`** so all failures are reported instead of stopping at the first.
- Example: `expect.soft(page.getByLabel('Email')).toHaveValue(''); expect.soft(page.getByLabel('Name')).toHaveValue('');` — then continue or do a final hard assert. The test fails at the end if any soft assertion failed.

## How to write data-driven tests

- Put test data in **`data/*.json`** (e.g. `data/users.json`).
- In the spec, import the JSON and **loop** over entries: `for (const row of data) { test(\`...\`, async () => { ... }); }`.
- See **tests/e2e/login.spec.ts** for an example that runs the same login flow for invalid and valid credentials from `data/users.json`.

## Where to look for more

- **Project layout and scripts:** README.md
- **BlazeMeter 15 practices mapped to this framework:** docs/ui-automation-best-practices.md
- **Locator order and examples:** docs/locator-strategy.md
- **Config and practices:** docs/best-practices.md
- **TypeScript/OOP concepts in this repo:** language-features.md
