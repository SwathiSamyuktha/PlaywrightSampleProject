import { Page } from '@playwright/test';

/** Shared base for all page objects. Uses Playwright Page directly. */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Navigate to a path (relative to baseURL) or full URL. */
  async goto(path: string = ''): Promise<void> {
    const url = path.startsWith('http') ? path : path ? `/${path.replace(/^\//, '')}` : '';
    await this.page.goto(url, { timeout: 60000 });
  }
}
