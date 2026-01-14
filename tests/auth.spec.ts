import { test, expect } from "@playwright/test";

test.describe("Auth", () => {
  test("valid login shows success message", async ({ page }) => {
    await page.goto("/login");
    await page.locator("#username").fill("tomsmith");
    await page.locator("#password").fill("SuperSecretPassword!");
    await page.getByRole("button", { name: /login/i }).click();

    const flash = page.locator("#flash");
    await expect(flash).toContainText("You logged into a secure area!");
    await expect(page).toHaveURL(/.*secure/);
  });

  test("invalid login shows error message", async ({ page }) => {
    await page.goto("/login");
    await page.locator("#username").fill("wrong");
    await page.locator("#password").fill("wrong");
    await page.getByRole("button", { name: /login/i }).click();

    const flash = page.locator("#flash");
    await expect(flash).toContainText("Your username is invalid!");
  });
});
