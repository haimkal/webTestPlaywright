const { request } = require("@playwright/test");

async function tryCheckLead() {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Send POST request to check lead
  const response = await apiContext.post(
    "https://crm.schemathics.com/dashboard/service.php",
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        action: "checkLead",
        token: "6407441f2d2e79.73284907",
        email: "Test1@gmail.com",
      }),
    }
  );

  // Log status and headers
  console.log("Status:", response.status());
  console.log("Headers:", response.headers());

  // Parse response body as JSON and log the entire structure
  const responseBody = await response.json();
  console.log("Full Response Body:", JSON.stringify(responseBody, null, 2));

  // Attempt to access jornaya_lead_id and cert_url by checking potential paths
  const jornayaLeadId =
    responseBody?.jornaya_lead_id || responseBody?.data?.jornaya_lead_id;
  const certUrl = responseBody?.cert_url || responseBody?.data?.cert_url;

  // Check if the values are found
  if (jornayaLeadId && certUrl) {
    console.log("jornaya_lead_id:", jornayaLeadId);
    console.log("cert_url:", certUrl);
  } else {
    console.log("jornaya_lead_id or cert_url is missing or null");
    console.log("jornaya_lead_id:", jornayaLeadId);
    console.log("cert_url:", certUrl);
  }

  // Close the API request context
  await apiContext.dispose();
}

// Run the tryCheckLead function
tryCheckLead();
