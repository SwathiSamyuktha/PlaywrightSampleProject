/**
 * Login page object using WebDriver (for integration tests that need driver-based flow).
 */
import { PageObject } from './PageObject';

export class LoginPageWithDriver extends PageObject {
  protected get baseSelector(): string {
    return '#content';
  }

  private get usernameInput(): string {
    return '#username';
  }
  private get passwordInput(): string {
    return '#password';
  }
  private get submitButton(): string {
    return 'button[type="submit"]';
  }
  private get flashMessage(): string {
    return '#flash';
  }

  async login(username: string, password: string): Promise<void> {
    await this.driver.fill(this.usernameInput, username);
    await this.driver.fill(this.passwordInput, password);
    await this.driver.click(this.submitButton);
  }

  async getFlashText(): Promise<string> {
    return this.driver.getText(this.flashMessage);
  }

  async isLoginFormVisible(): Promise<boolean> {
    return this.driver.isVisible(this.usernameInput);
  }
}
