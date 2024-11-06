const { test, expect } = require("@playwright/test");
const { tryCheckLead } = require("../tryCheckLead");

// This ensures that tests in this file run sequentially
// Changed to test.describe
test("Second page", async ({ page }) => {
  await page.goto(
    "https://top10us.com/categories/home-lifestyle/home-security-quote-long/?campaignId=w7IaXs&source=GL&sub1=test&affId=631015f268f9d"
  );
  await page.locator("#label_5_39_0").click();
  await page.locator("#input_5_1002").click();
  await page.locator("#input_5_1002").fill("12345");
  await page.locator("#gform_next_button_5_44").click();
  await page.locator("#label_5_4_0").click();
  await page.locator("#label_5_41_1").click();
  await page.locator("#gform_next_button_5_14").click();
  await page.locator("#label_5_43_1").click();
  await page.locator("#input_5_52_1").fill("1234");
  await page.locator("#input_5_52_3").fill("city");
  await page.locator("#gform_next_button_5_17").click();
  await page.locator("#input_5_18_3").fill("Test2");
  await page.locator("#input_5_18_6").fill("Test");
  await page.locator("#input_5_20").fill("Test2@gmail.com");
  await page.locator("#input_5_19").click();
  await page.locator("#input_5_19").fill("7182222222");
  await page.locator("#gform_submit_button_5").click();
  await page.waitForTimeout(5000); // Optional, adjust based on your needs
  await tryCheckLead("Test2@gmail.com");
});
