/**
 * WebDriver — wraps Playwright page/context for driver-based page objects.
 */
import { Page, BrowserContext } from '@playwright/test';

export interface WebDriver {
  readonly page: Page;
  readonly context: BrowserContext;
  goto(url: string, options?: { timeout?: number }): Promise<void>;
  click(selector: string): Promise<void>;
  fill(selector: string, value: string): Promise<void>;
  getText(selector: string): Promise<string>;
  isVisible(selector: string): Promise<boolean>;
}

export class PlaywrightWebDriver implements WebDriver {
  constructor(
    public readonly page: Page,
    public readonly context: BrowserContext
  ) {}

  async goto(url: string, options?: { timeout?: number }): Promise<void> {
    await this.page.goto(url, { timeout: options?.timeout ?? 60000 });
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async fill(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }

  async getText(selector: string): Promise<string> {
    const text = await this.page.textContent(selector);
    return text ?? '';
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.isVisible(selector);
  }
}
