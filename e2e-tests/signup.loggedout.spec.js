// @ts-check
import { test, expect } from "@playwright/test";
import { randomUUID } from "crypto";

test("should sign up", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Log in / Sign up" }).click();

  await expect(page).toHaveURL(/.*auth0.com/);

  await page.getByRole("link", { name: "Sign Up" }).click();
  await page
    .getByPlaceholder("yours@example.com")
    .fill(`${randomUUID()}@gmail.com`);
  await page.getByPlaceholder("your password").fill("Sign.Up!!!");
  await page.getByRole("button", { name: "SIGN UP" }).click();

  await page.click("#allow");

  await expect(page).toHaveTitle("Bitcoin wallet", { timeout: 15000 });
  await page.getByRole("link", { name: "Wallet" }).click();

  await expect(page).toHaveURL(/.*\/link-bank-account/);

  // XXX create test-only API endpoint to bypass Plaid linking,
  // and continue signup flow until reaching "/wallet"
});
