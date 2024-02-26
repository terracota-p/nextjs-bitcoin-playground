// @ts-check
import { test, expect } from "@playwright/test";

test("home", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Bitcoin wallet");
  await expect(
    page.getByRole("heading", { name: "Bitcoin wallet" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Log in / Sign up" })
  ).toBeVisible();
});
