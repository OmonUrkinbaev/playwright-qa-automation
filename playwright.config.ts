import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 5_000 },

  // Flaky handling basics
  retries: process.env.CI ? 2 : 1, // локально 1 ретрай, в CI 2
  forbidOnly: !!process.env.CI,    // защита от случайного test.only
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: "https://the-internet.herokuapp.com",

    // Key anti-flaky artifacts:
    trace: "on-first-retry",           // trace появится если тест упал и пошёл ретрай
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  ],
});
