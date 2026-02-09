/**
 * LocatorHelper — official locator strategy (getByRole, getByLabel, etc.).
 * See: https://playwright.dev/docs/locators
 */
import { Page, Locator } from '@playwright/test';

export interface GetByRoleOptions {
  name?: string | RegExp;
  exact?: boolean;
  checked?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  selected?: boolean;
  pressed?: boolean;
}

export class LocatorHelper {
  constructor(private readonly page: Page) {}

  get pageRef(): Page {
    return this.page;
  }

  getByRole(role: Parameters<Page['getByRole']>[0], options?: GetByRoleOptions): Locator {
    return this.page.getByRole(role, options as Parameters<Page['getByRole']>[1]);
  }

  getByText(text: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByText(text, options);
  }

  getByLabel(text: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByLabel(text, options);
  }

  getByPlaceholder(text: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByPlaceholder(text, options);
  }

  getByAltText(text: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByAltText(text, options);
  }

  getByTitle(text: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByTitle(text, options);
  }

  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}

export function createLocatorHelper(page: Page): LocatorHelper {
  return new LocatorHelper(page);
}
