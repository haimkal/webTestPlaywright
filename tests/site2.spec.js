const { test, expect } = require("@playwright/test");

// This ensures that tests in this file run sequentially
// Changed to test.describe
test.beforeEach("Second page", async ({ page }) => {
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
});
test("CRM", async ({ page }) => {
  await page.goto("https://crm.schemathics.com/dashboard/");
  await page.locator("#username").fill("guyb");
  await page.locator("#password").fill("guyb1234");
  await page.waitForTimeout(1000);
  await page.locator("button[type='submit']").click();
  await page.waitForTimeout(3000);
  await page.locator("#verefication").fill("Aa0543982262aa!");
  await page.waitForTimeout(3000);
  await page.locator(".d-flex button").click();
  await page.locator("a[aria-current='admin_leads_incoming']").click();
  await page.waitForTimeout(7000);
  const rows = await page.$$(".lead-item");

  for (const row of rows) {
    // Locate the name element
    const nameElement = await row.$('[data-attribute="email"] > span');
    const name = await nameElement.innerText();

    console.log(name);

    if (name === "Test2@gmail.com") {
      // Click the actions button
      const actionsButton = await row.$("button[aria-expanded='false']");
      await actionsButton.click();

      // Wait for the dropdown to open
      await page.waitForTimeout(3000);

      // Click the edit button
      const editButton = await row.$(".dropdown-item");
      await editButton.click();

      // Wait for the modal or new page to load, adjust if necessary
      await page.waitForTimeout(3000);

      // Get the Jornaya lead ID
      const jornayaLead = await page
        .locator("#lc_jornaya_lead_id")
        .inputValue();
      console.log(jornayaLead);
      console.assert(jornayaLead !== "", "Jornaya Lead ID should not be empty");

      // Get the Cert URL
      const certUrl = await page.locator("#lc_cert_url").inputValue();
      console.log(certUrl);
      console.assert(certUrl !== "", "Cert URL should not be empty");

      break; // Exit the loop after finding the desired lead
    }
  }
});
