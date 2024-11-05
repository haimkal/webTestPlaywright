const { test, expect } = require("@playwright/test");

test.beforeEach("Third page", async ({ page }) => {
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
});
// Now run the CRM test only if the third page test passed
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

    if (name === "Test3@gmail.com") {
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
