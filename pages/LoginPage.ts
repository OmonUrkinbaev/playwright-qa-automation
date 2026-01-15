import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly flash: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("#username");
    this.password = page.locator("#password");
    this.loginBtn = page.getByRole("button", { name: /login/i });
    this.flash = page.locator("#flash");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async expectSuccess() {
    await expect(this.flash).toContainText("You logged into a secure area!");
    await expect(this.page).toHaveURL(/.*secure/);
  }

  async expectFlashContains(text: string) {
  await expect(this.flash).toContainText(text);
}

async expectFlashContainsEventually(text: string) {
  await expect
    .poll(async () => (await this.flash.textContent()) ?? "", {
      timeout: 5_000,
      intervals: [200, 400, 800, 1200],
    })
    .toContain(text);
}

}
