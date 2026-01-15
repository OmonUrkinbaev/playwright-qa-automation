import { test, expect } from "@playwright/test";

test.describe("API @api", () => {
  test("GET /posts/1 returns expected shape and values", async ({ request }) => {
    const res = await request.get("https://jsonplaceholder.typicode.com/posts/1");

    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);

    const body = await res.json();

    // Basic contract checks
    expect(body).toHaveProperty("userId");
    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("title");
    expect(body).toHaveProperty("body");

    // Stronger assertions (makes it look more professional)
    expect(typeof body.userId).toBe("number");
    expect(typeof body.id).toBe("number");
    expect(typeof body.title).toBe("string");
    expect(typeof body.body).toBe("string");

    // Deterministic check for this endpoint
    expect(body.id).toBe(1);
  });

  test("POST /posts returns 201 and echoes payload", async ({ request }) => {
    const payload = {
      title: "playwright-api-test",
      body: "minimal API test example",
      userId: 1,
    };

    const res = await request.post("https://jsonplaceholder.typicode.com/posts", {
      data: payload,
    });

    expect(res.status()).toBe(201);

    const body = await res.json();

    // API behavior of JSONPlaceholder: returns your fields + id
    expect(body).toMatchObject(payload);
    expect(body).toHaveProperty("id");
    expect(typeof body.id).toBe("number");
  });
});
