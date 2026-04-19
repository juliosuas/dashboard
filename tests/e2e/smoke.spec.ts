import { expect, test } from "@playwright/test";

test("home redirects to inbox", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/inbox$/);
});
