// @ts-check
import { test, expect } from "@playwright/test";

test("should be able to purchase bitcoin", async ({ page }) => {
  // Given logged in and linked account and bitcoin address (in global.setup.js)

  await page.goto("/wallet");
  page.getByRole("link", { name: "Purchase bitcoins" }).click();

  await expect(page).toHaveURL(/.*wallet\/purchase/);

  await page.getByLabel("amount").fill("0.0001");
  await page.getByRole("button", { name: "purchase" }).click();

  await expect(page.getByText("You purchased 0.0001 BTC")).toBeVisible({
    timeout: 10000,
  });
});
