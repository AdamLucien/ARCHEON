import { test, expect } from "@playwright/test";

const sectionIds = ["hero", "architecture", "pillars", "use-cases", "implementation", "contact"];

test("renders all primary sections", async ({ page }) => {
  await page.goto("/en");
  for (const id of sectionIds) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test("language switcher preserves anchor", async ({ page }) => {
  await page.goto("/en#pillars");
  await page.locator("header").getByRole("button", { name: "CZ" }).first().click();
  await expect(page).toHaveURL(/\/cz#pillars$/);
});

test("pillar pin sets and clears use-case label", async ({ page }) => {
  await page.goto("/en#pillars");
  await page.getByRole("button", { name: /Resources/i }).click();
  await expect(page.getByTestId("usecases-pinned-label")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("usecases-pinned-label")).toHaveCount(0);
});
