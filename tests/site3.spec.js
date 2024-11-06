const { test, expect } = require("@playwright/test");
const { tryCheckLead } = require("../tryCheckLead");

test("Third page", async ({ page }) => {
  await page.goto(
    "https://top10us.com/categories/home-lifestyle/home-security-quote-long-v2/?campaignId=w7IaXs&source=GL&sub1=test&affId=631015f268f9d"
  );

  await page.locator("#label_44_39_0").click();
  await page.locator("#input_44_54").click();
  await page.locator("#input_44_54").fill("12345");
  await page.locator("#gform_next_button_44_48").click();
  await page.locator("#label_44_4_0").click();
  await page.locator("#gform_next_button_44_14").click();
  await page.locator("#label_44_43_1").click();
  await page.locator("#label_44_49_0").click();
  await page.locator("#input_44_52_1").fill("1234");
  await page.locator("#input_44_52_3").fill("city");
  await page.locator("#gform_next_button_44_17").click();
  await page.locator("#input_44_18_3").fill("Test");
  await page.locator("#input_44_18_6").fill("Test");
  await page.locator("#input_44_20").fill("Test3@gmail.com");
  await page.locator("#input_44_19").click();
  await page.locator("#input_44_19").fill("7182222222");
  await page.locator("#gform_submit_button_44").click();
  await page.waitForTimeout(5000); // Adjust based on response time
  await tryCheckLead("Test3@gmail.com");
});
