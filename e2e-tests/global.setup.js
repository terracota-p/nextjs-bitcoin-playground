import { test as setup, expect } from "@playwright/test";
import { STORAGE_STATE } from "../playwright.config";

setup("log in", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Log in / Sign up" }).click();

  await expect(page).toHaveURL(/.*auth0.com/);

  // Given user previously signed up, linked account, gen bitcoin address
  const email = "mmreme8814@gmail.com";
  const password = "Sign.Up!!!";

  await page.getByPlaceholder("yours@example.com").fill(email);
  await page.getByPlaceholder("your password").fill(password);
  await page.getByRole("button", { name: "LOG IN" }).click();

  await expect(page).toHaveTitle("Bitcoin wallet", { timeout: 15000 });

  await page.context().storageState({ path: STORAGE_STATE });
});
