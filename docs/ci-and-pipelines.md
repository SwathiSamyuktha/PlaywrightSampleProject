# CI/CD and Pipelines

## GitHub Workflows

| Workflow | Trigger | What runs |
| -------- | -------- | --------- |
| **CI (Build + Smoke)** | Push/PR to `main` or `master` | Lint, format check, smoke tests (`@smoke`). Email sent at end. |
| **Nightly Regression** | Daily at 2:00 AM UTC; or manual `workflow_dispatch` | Full regression suite (`@regression`). Email sent at end. |

## Test tags

- **@smoke** — Critical path tests (login, API auth, dashboard, one API validation, one integration, homepage). Run with `npm run test:smoke` or `--grep @smoke`.
- **@regression** — All tests. Run with `npm run test:regression` or `--grep @regression`.

Smoke tests are a subset of regression; both tags can appear on the same test.

## Email notification

An email is sent to **swathi.samyuiktha@fintexinc.com** at the end of every pipeline run (CI and Nightly), with the workflow result (success/failure).

To enable email, add these **GitHub repository secrets** (Settings → Secrets and variables → Actions):

| Secret | Description |
| ------ | ----------- |
| `SMTP_HOST` | SMTP server (e.g. `smtp.gmail.com`, `smtp.office365.com`) |
| `SMTP_PORT` | Port (e.g. `587` for TLS) |
| `SMTP_USERNAME` | SMTP login |
| `SMTP_PASSWORD` | SMTP password (e.g. app password for Gmail) |
| `SMTP_FROM` | Sender address (e.g. `noreply@yourdomain.com` or your email) |

If these secrets are not set, the email step is skipped (it uses `continue-on-error: true` so the workflow still passes).

## Local commands

- `npm run test:smoke` — Run smoke tests only.
- `npm run test:regression` — Run all regression tests (full suite).
