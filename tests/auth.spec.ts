import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Auth (Page Object + Data-Driven) @ui", () => {
  test("valid login shows success message", async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login("tomsmith", "SuperSecretPassword!");
    await login.expectSuccess();
  });

  const invalidCases = [
    {
      name: "invalid username",
      username: "wrong",
      password: "SuperSecretPassword!",
      expectedMessage: "Your username is invalid!",
    },
    {
      name: "invalid password",
      username: "tomsmith",
      password: "wrong",
      expectedMessage: "Your password is invalid!",
    },
    {
      name: "both invalid",
      username: "wrong",
      password: "wrong",
      expectedMessage: "Your username is invalid!",
    },
  ] as const;

  for (const c of invalidCases) {
    test(`invalid login shows error (${c.name})`, async ({ page }, testInfo) => {
      if (testInfo.retry > 0) {
        console.log(`Retry #${testInfo.retry} for case: ${c.name}`);
      }
      const login = new LoginPage(page);

      await login.goto();
      await login.login(c.username, c.password);

      // The-internet returns different messages depending on which field is wrong
      // We assert a deterministic expected message per case
      await login.expectFlashContainsEventually(c.expectedMessage);
    });
  }
});
