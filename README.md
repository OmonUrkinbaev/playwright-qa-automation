![Playwright Tests](https://github.com/omonurkinbaev/playwright-qa-automation/actions/workflows/playwright.yml/badge.svg)

# Playwright QA Automation Starter (TypeScript)

Production-style **QA Automation project** built with **Playwright Test** and **TypeScript**.  
Demonstrates modern UI and API testing practices, Page Object Model, data-driven tests, flaky handling, and CI strategy commonly used in real engineering teams.

---

## 🧰 Tech Stack
- **Playwright Test**
- **TypeScript / JavaScript**
- **Node.js**
- **GitHub Actions (CI/CD)**
- HTML reports, screenshots, videos, and traces on failures

---

## 📁 Project Structure
playwright-qa-starter/

├─ .github/workflows/

│ └─ playwright.yml # CI pipelines (PR, main, nightly)

├─ pages/

│ └─ LoginPage.ts # Page Object Model

├─ tests/

│ ├─ auth.spec.ts # UI E2E tests (data-driven login)

│ ├─ smoke.spec.ts # Smoke tests

│ └─ api.spec.ts # API contract tests

├─ playwright.config.ts

├─ package.json

└─ README.md


---

## ✅ Test Coverage

### UI Automation (E2E)
- Login flow with **valid and invalid credentials**
- **Data-driven negative scenarios**
- Smoke tests for critical UI functionality
- **Page Object Model** for reusable actions and stable selectors

### API Testing
- **GET** request validation (status code, response schema, data types)
- **POST** request validation (payload and response checks)
- Basic **API contract testing** using Playwright `request`

### Test Types
- End-to-End (E2E)
- Smoke
- Regression-ready structure

---

## 🏷 Test Tags
Tests are grouped using tags to support selective execution:

- `@smoke` — fast smoke tests  
- `@ui` — UI end-to-end tests  
- `@api` — API contract tests  

### Run tests by tag


- npm run test:smoke
- npm run test:ui
- npm run test:api

▶️ Run Tests Locally
- Install dependencies
- npm ci
- npx playwright install

Run all tests
- npm run test:e2e

Open HTML report
- npm run report

🧯 Flaky Test Handling

This project applies common anti-flaky practices used in production environments:
- Retries (local and CI)
- Trace on first retry for faster debugging
- Screenshots and videos captured on failures
- Stable locators (getByRole, deterministic selectors)
- Timing-sensitive assertions handled with expect.poll(...)

🧪 CI Strategy

- CI pipelines are implemented using GitHub Actions:

Pull Requests:
- Runs fast @smoke tests for quick feedback

Main branch:
- Runs full regression (@ui + @api) via test:ci

Nightly:
- Runs stable @api tests daily to validate API contracts

All CI runs generate HTML reports and store artifacts for debugging.

🎯 Why This Project

This repository demonstrates:

- Modern JavaScript/TypeScript-based QA Automation
- Practical UI + API testing approach
- Maintainable architecture using Page Object Model
- Realistic CI strategy with smoke, regression, and nightly runs
- Understanding of test stability and flaky test handling

Designed to reflect expectations for QA Automation Engineer / SDET roles.

📌 Author
Omon Urkinbaev
QA Automation Engineer
Toronto, Canada
LinkedIn: https://www.linkedin.com/in/omonurkinbaev
