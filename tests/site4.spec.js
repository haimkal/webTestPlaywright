import { test, expect } from "@playwright/test";
const { tryCheckLead } = require("../tryCheckLead");

test("Site4", async ({ page }) => {
  await page.goto(
    "https://top10us.com/static/home-warranty-V1/?campaignId=w7IaXs&source=GL&sub1=QA.Test&affId=631015f268f9d"
  );
  await page.getByRole("textbox").fill("12345");
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Next" }).click();
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Next" }).click();
  await page.locator("label").filter({ hasText: "Yes" }).click();
  await page.getByPlaceholder("Enter your address").click();
  await page.getByPlaceholder("Enter your address").fill("1234");
  await page.getByPlaceholder("Enter your address").press("Tab");
  await page.getByPlaceholder("Enter your city").fill("city");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByPlaceholder("First").click();
  await page.getByPlaceholder("First").fill("Test4");
  await page.getByPlaceholder("First").press("Tab");
  await page.getByPlaceholder("Last").fill("Test");
  await page.getByPlaceholder("Last").press("Tab");
  await page.getByPlaceholder("E-mail").fill("haim@top10us.com");
  await page.getByPlaceholder("Phone").click();
  await page.getByPlaceholder("Phone").fill("7182222222");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.waitForTimeout(5000);
  expect(page.url()).toBe("https://top10us.com/home-warranty-thankyou/");
  await tryCheckLead("haim@top10us.com");
});
