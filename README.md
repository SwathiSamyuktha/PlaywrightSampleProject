# Playwright Framework Template (PW Template)

A Playwright test framework with **page objects**, **fixtures**, **single config**, and **reports**.

## Project layout

```
├── playwright.config.ts         # Playwright config
├── package.json
├── tsconfig.json
│
├── tests/                       # Test specs (by type)
│   ├── e2e/                     # UI tests (login, dashboard, user-profile)
│   ├── api/                     # API tests (auth, users, validations)
│   ├── visual/                  # Visual regression (homepage)
│   └── integration/             # API–UI (api-ui.spec.ts)
│
├── page-objects/                # Page Object Model (flat)
│   ├── BasePage.ts, WebDriver.ts, PageObject.ts
│   ├── LoginPage.ts, LoginPageWithDriver.ts, SignupPage.ts
│   └── DashboardPage.ts, ProfilePage.ts
│
├── fixtures/                    # Fixtures (base, auth, api, db)
│   ├── base.ts                  # test + logger
│   ├── auth.ts, api.ts, db.ts
│
├── utils/                       # Helpers
│   ├── logger.ts, helpers.ts, data-generators.ts, api-ui.ts, LocatorHelper.ts
│
├── constants/                   # Constants & enums
│   ├── constants.ts            # TestConstants (timeouts, content-types)
│   ├── enums.ts                 # e.g. HttpStatus
│   └── index.ts
│
├── data/                        # Test data (JSON, seed data)
│   ├── users.json
│   └── api-endpoints.json
│
├── config/                      # Single config (env vars override)
│   └── env.ts
│
├── docs/                        # locator-strategy, best-practices, language-features
└── reports/                     # screenshots, playwright-report
```

## Quick start

```bash
npm install
npm test
```

- **Base URL:** [the-internet.herokuapp.com](https://the-internet.herokuapp.com) (override with `BASE_URL`)
- **API base:** `API_BASE_URL` (default: https://jsonplaceholder.typicode.com)

### Scripts

| Script                     | Description        |
| -------------------------- | ------------------ |
| `npm test`                 | All tests          |
| `npm run test:e2e`         | E2E UI tests       |
| `npm run test:api`         | API tests          |
| `npm run test:visual`      | Visual tests       |
| `npm run test:integration` | API–UI integration |
| `npm run test:ui`          | Playwright UI      |
| `npm run test:smoke`       | Smoke tests only   |
| `npm run test:regression`  | Full regression    |
| `npm run lint`             | Run ESLint         |
| `npm run lint:fix`         | ESLint with fix    |
| `npm run format`           | Prettier format    |
| `npm run format:check`     | Prettier check     |

## Config

- **Single file:** `config/env.ts` — baseURL, apiBaseURL, timeouts. Override with env vars: `BASE_URL`, `API_BASE_URL`, `PW_NAVIGATION_TIMEOUT`, `PW_ACTION_TIMEOUT`. `playwright.config.ts` reads from it.

## Data & constants

- **Test data:** `data/users.json`, `data/api-endpoints.json` — static payloads and endpoints.
- **Constants & enums:** `constants/` — `TestConstants` (timeouts, content-types), `HttpStatus` and other enums. Import from `constants` or `constants/constants`, `constants/enums`.

## Page objects

- **Flat:** All in `page-objects/` — `BasePage`, `WebDriver`, `PageObject`, `LoginPage`, `LoginPageWithDriver`, `SignupPage`, `DashboardPage`, `ProfilePage`.

## Fixtures

- **fixtures/base.ts** — test + logger. **auth.ts** — `loginPage`. **api.ts** — API tests. **db.ts** — DB placeholder.

## Git

- **`.gitignore`** — Ignores `node_modules/`, `dist/`, `test-results/`, `reports/`, `.env`, IDE/OS junk.
- **Git hooks (Husky + lint-staged):** On **pre-commit**, only staged `.ts` / `.json` / `.md` files are linted (ESLint --fix) and formatted (Prettier). So you can’t commit lint errors or unformatted code unless you skip the hook (`git commit --no-verify`). Run `git init` then `npm install` once to enable hooks.

## How-to guides

See **how-to.md** for step-by-step instructions.

## CI / Pipelines

- **Build (push/PR):** Lint, format check, smoke tests. See `.github/workflows/ci.yml`.
- **Nightly:** Full regression at 2:00 AM UTC. See `.github/workflows/nightly-regression.yml`.
- **Notifications:** Use GitHub's default setup (Settings → Notifications → Actions) for email on workflow failures (see **docs/ci-and-pipelines.md**).

## Docs

- **docs/ci-and-pipelines.md** — CI, nightly, tags, email setup.
- **docs/ui-automation-best-practices.md** — BlazeMeter’s 15 UI automation practices mapped to this framework.
- **docs/locator-strategy.md** — Playwright locator priority (getByRole, getByLabel, …).
- **docs/best-practices.md** — Practices and where they’re implemented.
- **docs/language-features.md** — TypeScript/OOP concepts in the framework.
