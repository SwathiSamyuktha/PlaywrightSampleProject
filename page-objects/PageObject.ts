/**
 * PageObject — base for driver-based page objects (composition with WebDriver).
 */
import { WebDriver } from './WebDriver';

export abstract class PageObject {
  protected readonly driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  protected abstract get baseSelector(): string;

  async goto(path: string = ''): Promise<void> {
    const url = path ? (path.startsWith('http') ? path : `/${path.replace(/^\//, '')}`) : '';
    await this.driver.goto(url);
  }
}
