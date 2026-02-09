# Locator Strategy (Playwright Official)

Per [Playwright Locators](https://playwright.dev/docs/locators), use these **in priority order** for resilient, user-facing tests.

## Priority order

1. **`page.getByRole()`** — Prefer for interactive elements. Reflects how users and assistive technology see the page (button, checkbox, heading, link). Prefer including the **accessible name**.
   - Example: `page.getByRole('button', { name: 'Sign in' }).click()`
   - Use for: buttons, links, checkboxes, headings, form controls when you have a role + name.

2. **`page.getByText()`** — By text content. Use for **non-interactive** elements (div, span, p). For buttons/links prefer `getByRole`.
   - Example: `expect(page.getByText('Welcome, John!')).toBeVisible()`
   - Options: `{ exact: true }` or regex: `getByText(/welcome, \w+/i)`.

3. **`page.getByLabel()`** — Form controls by their **associated label**.
   - Example: `page.getByLabel('Password').fill('secret')`
   - Prefer for: inputs, selects, textareas with a visible label.

4. **`page.getByPlaceholder()`** — Inputs by **placeholder** when there is no label.
   - Example: `page.getByPlaceholder('name@example.com').fill('a@b.com')`

5. **`page.getByAltText()`** — Images (and area) by **alt text**.
   - Example: `page.getByAltText('playwright logo').click()`

6. **`page.getByTitle()`** — By **title** attribute.
   - Example: `expect(page.getByTitle('Issues count')).toHaveText('25')`

7. **`page.getByTestId()`** — By **data-testid** (or custom attribute via `testIdAttribute` in config). Most stable for dynamic/changing UI; less user-facing.
   - Example: `page.getByTestId('submit-button').click()`
   - Use when: role/text are unstable or you need a strict contract with devs.

## Avoid when possible

- **CSS / XPath** — `page.locator('css=...')` or `page.locator('xpath=...')`. Tied to DOM structure; breaks when layout changes. Use only when no role/label/text/testid fits.

## Filtering and chaining

- **Filter by text:** `page.getByRole('listitem').filter({ hasText: 'Product 2' })`
- **Filter by child:** `page.getByRole('listitem').filter({ has: page.getByRole('heading', { name: 'Product 2' }) })`
- **Narrow inside:** `page.getByRole('dialog').getByRole('button', { name: 'Save' })`
- **Strictness:** Playwright is strict: if multiple elements match, use `.first()` / `.nth()` only when necessary; prefer a more specific locator.

## Usage in this project

- Use **`LocatorHelper`** (or `page` directly) with **getByRole** and **getByLabel** in new tests and page objects.
- Reserve **getByTestId** for dynamic list items or when product agrees on `data-testid`.
- Use **CSS** only when the above do not apply; document the reason in a comment.
