import { test, expect } from "@playwright/test";

test.describe("Smoke @smoke", () => {
  test("home page has expected heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Welcome to the-internet" })).toBeVisible();
  });

  test("checkboxes can be toggled", async ({ page }) => {
    await page.goto("/checkboxes");
    const boxes = page.locator('input[type="checkbox"]');
    await expect(boxes).toHaveCount(2);

    // Toggle first checkbox ON
    await boxes.nth(0).check();
    await expect(boxes.nth(0)).toBeChecked();

    // Toggle second checkbox OFF (по умолчанию он обычно checked)
    await boxes.nth(1).uncheck();
    await expect(boxes.nth(1)).not.toBeChecked();
  });
});
