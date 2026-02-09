# CI/CD and Pipelines

## GitHub Workflows

| Workflow               | Trigger                                             | What runs                                |
| ---------------------- | --------------------------------------------------- | ---------------------------------------- |
| **CI (Build + Smoke)** | Push/PR to `main` or `master`                       | Lint, format check, smoke tests (`@smoke`, Chromium only). |
| **Nightly Regression** | Daily at 2:00 AM UTC; or manual `workflow_dispatch` | Full regression suite (`@regression`).   |

## Test tags

- **@smoke** — Critical path tests (login, API auth, dashboard, one API validation, one integration, homepage). Run with `npm run test:smoke` or `--grep @smoke`.
- **@regression** — All tests. Run with `npm run test:regression` or `--grep @regression`.

Smoke tests are a subset of regression; both tags can appear on the same test.

## Notifications (GitHub default setup)

To get notified when a workflow **fails**, use GitHub’s built-in notifications:

1. Open your **GitHub profile** → **Settings** → **Notifications**.
2. Under **Actions**, choose **Email** (and/or **Web**).
3. Optionally, **Watch** the repo (Watch → Custom → check “Actions”) so you only get alerts for workflow runs.

You’ll receive an email from GitHub when a run fails; no SMTP or secrets required. For success/failure details anytime, check the **Actions** tab in the repo.

## Local commands

- `npm run test:smoke` — Run smoke tests only.
- `npm run test:regression` — Run all regression tests (full suite).
