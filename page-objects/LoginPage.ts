import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  async login(username: string, password: string): Promise<void> {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async getFlashText(): Promise<string> {
    return this.page.locator('#flash').textContent() ?? '';
  }

  async isLoginFormVisible(): Promise<boolean> {
    return this.page.locator('#username').isVisible();
  }
}
