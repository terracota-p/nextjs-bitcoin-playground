// @ts-check
import { test, expect } from "@playwright/test";

test("should access wallet given linked account and bitcoin address", async ({
  page,
}) => {
  // Given logged in and linked account and bitcoin address (in global.setup.js)

  await page.goto("/wallet");

  await expect(page.getByText("Welcome to your wallet")).toBeVisible();
  await expect(page.getByText("Your bank account is")).toBeVisible();
  await expect(page.getByText("Your bitcoin address is")).toBeVisible();
});
