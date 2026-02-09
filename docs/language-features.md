# Language features used in this framework

This document maps **TypeScript/JavaScript and OOP concepts** to where they appear in the Playwright framework, so you can learn the language while reading the code.

---

## 1. Inheritance (fixtures and page objects)

- **`abstract class`** — In `page-objects/BasePage.ts` and `PageObject.ts`. Base classes that specs extend; subclasses (e.g. LoginPage, DashboardPage) “extend” the idea.
- **`extends`** — Fixtures extend Playwright’s `test`; specs use `test` from `fixtures/base` or `fixtures/auth`. They inherit the `logger` fixture.
- **`protected`** — In BasePage and PageObject. `protected page` and `protected driver` are visible only in the class and subclasses.

**UML:** BasePage ← LoginPage, DashboardPage (inheritance).

---

## 2. Association — “uses” (LoginTest uses Logger)

- **Dependency injection** — In `tests/e2e/login.spec.ts` and `tests/api/*.spec.ts`. The `logger` is passed in as a fixture; tests _use_ it but don’t create or own its lifecycle.
- **`constructor(logger: Logger)`** — In `fixtures/base.ts`. The logger is injected as a fixture (association).

**UML:** LoginTest ——uses——> Logger (association).

---

## 3. Composition — “owns” (PageObject \*-- WebDriver)

- **`constructor(driver: WebDriver)`** — In `page-objects/PageObject.ts` and `LoginPageWithDriver.ts`. PageObject receives a WebDriver and uses it for its whole lifetime.
- **`protected readonly driver`** — In PageObject. Single owner reference; `readonly` means the reference can’t be reassigned.

**UML:** PageObject \*-- WebDriver (composition: PageObject “owns” the driver for its lifetime).

---

## 4. Aggregation — “has a collection of”

- **Collections** — Playwright discovers tests by file pattern (`**/*.spec.ts`). You can model “has many” in your own code (e.g. a runner that holds a list of spec paths). The framework keeps things simple: no extra suite registry.

---

## 5. TypeScript syntax used

- **`type`** — Logger, fixtures. Example: `type LogLevel = 'debug' | 'info' | 'warn' | 'error'`.
- **`interface`** — WebDriver. Example: `interface WebDriver { page: Page; goto(...): Promise<void>; }`.
- **`readonly`** — Logger, PageObject, WebDriver. Example: `private readonly prefix: string`.
- **Optional `?`** — WebDriver. Example: `options?: { timeout?: number }`.
- **Template literals** — Logger. Example: `` `[${ts}] [${level}] ${message}` ``.
- **`async` / `await`** — All specs, PageObject, WebDriver. Example: `async goto(url: string): Promise<void>`.
- **`Promise<T>`** — Return type of every async function.
- **Getter `get`** — LoginPage, PageObject. Example: `protected get baseSelector(): string`.
- **`export` / `import`** — Every file (ES modules).
- **Rest parameters** — Logger. Example: `...args: unknown[]`.
- **Method chaining** — Any class that returns `this` from methods. Example: `builder.add(...).add(...)`.

---

## 6. Playwright-specific

- **`test.extend({ fixture })`** — In `fixtures/base.ts`. Adds a `logger` fixture to Playwright’s `test`.
- **Fixtures in test callback** — In specs. Example: `async ({ page, context, logger }) => { ... }` (destructuring of the fixture object).
- **`expect`** — In specs. Example: `expect(response.ok()).toBe(true)` (Playwright assertions).
- **`request`** — In api.spec.ts. Playwright’s API request fixture for HTTP calls.

---

## 7. File → concept map

- **`utils/logger.ts`** — Class, `readonly`, template literals.
- **`fixtures/base.ts`** — Fixture with logger (test.extend).
- **`page-objects/WebDriver.ts`** — Interface (contract), implementation class.
- **`page-objects/PageObject.ts`** — Abstract class, composition with WebDriver.
- **`page-objects/LoginPage.ts`** and **LoginPageWithDriver.ts** — Page objects (page-based and driver-based).
- **`utils/LocatorHelper.ts`** — Official locator strategy (getByRole, getByLabel, …).
- **`tests/e2e/login.spec.ts`** — Fixtures, association (Logger), page objects.
- **`tests/api/api.spec.ts`** — Fixtures, association (Logger), request fixture.
- **`tests/integration/api-ui.spec.ts`** — API–UI integration (fetchViaApi + UI assertions).

Use this as a checklist: open each file and look for the listed features.
