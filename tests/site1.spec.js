const { test, expect } = require("@playwright/test");
const { tryCheckLead } = require("../tryCheckLead");

// This ensures that tests in this file run sequentially
test("Form Submission", async ({ page }) => {
  await page.goto(
    "https://top10us.com/home-warranty-premier-v2-cf7/?campaignId=w7IaXs&source=GL&sub1=test&affId=631015f268f9d"
  );

  // Fill out and submit the form
  await page.locator("#input_4_49").click();
  await page.locator("#input_4_49").fill("12345");
  await page.locator("#gform_next_button_4_3").click();
  await page.locator("#label_4_39_0").click();
  await page.locator("#label_4_4_0").click();
  await page.locator("label[for='choice_4_41_1']").click();
  await page.locator("#gform_next_button_4_14").click();
  await page.locator("#label_4_43_0").click();
  await page.locator("#label_4_45_1").click();
  await page.locator("#gform_next_button_4_46").click();
  await page.locator("#label_4_47_1").click();
  await page.locator("#gform_next_button_4_44").click();
  await page.locator("#input_4_15_1").fill("1234");
  await page.locator("#input_4_15_3").fill("city");
  await page.locator("#gform_next_button_4_17").click();
  await page.locator("#input_4_18_3").fill("Test");
  await page.locator("#input_4_18_6").fill("Test");
  await page.locator("#input_4_19").click();
  await page.locator("#input_4_19").fill("7182222222");
  await page.locator("#input_4_20").fill("Test1@gmail.com");
  await page.locator("#gform_submit_button_4").click();
  await page.waitForTimeout(5000); // Wait for submission to complete
  await tryCheckLead("Test1@gmail.com");
});
