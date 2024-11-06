const { request } = require("@playwright/test");

async function tryCheckLead(email) {
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
        email: email,
      }),
    }
  );
  const responseBody = await response.json();
  const jornayaLeadId =
    responseBody?.jornaya_lead_id || responseBody?.data?.jornaya_lead_id;
  const certUrl = responseBody?.cert_url || responseBody?.data?.cert_url;

  // Check if the values are found
  if (jornayaLeadId && certUrl) {
    console.log("jornaya_lead_id:", jornayaLeadId);
    console.log("cert_url:", certUrl);
  } else {
    console.log("jornaya_lead_id or cert_url is missing or null");
  }

  // Close the API request context
  await apiContext.dispose();
}

module.exports = { tryCheckLead };
