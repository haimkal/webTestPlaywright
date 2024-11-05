import { test, expect } from "@playwright/test";

test.beforeEach("Site4", async ({ page }) => {
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
  await page.getByPlaceholder("E-mail").fill("Test4@gmail.com");
  await page.getByPlaceholder("Phone").click();
  await page.getByPlaceholder("Phone").fill("7182222222");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.waitForTimeout(5000);
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

    if (name === "Test4@gmail.com") {
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
