const { request } = require("@playwright/test");
const { assert } = require("console");

async function tryCheckLead(email) {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Send POST request to check lead
  const response = await apiContext.post("https://crm.schemathics.com/dashboard/service.php", {
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      action: "checkLead",
      token: "6407441f2d2e79.73284907",
      email: email,
    }),
  });
  const responseBody = await response.json();
  const jornayaLeadId = responseBody?.jornaya_lead_id || responseBody?.data?.jornaya_lead_id;
  const certUrl = responseBody?.cert_url || responseBody?.data?.cert_url;
  const registerDate = responseBody?.register_date || responseBody?.data?.register_date;
  const today = new Date().toISOString().split("T")[0];
  const registerDateFormatted = registerDate ? registerDate.split(" ")[0] : null;
  console.log("register_date:", registerDate);
  console.log("today:", today);
  if (registerDateFormatted !== today) {
    throw new Error("register_date is not today");
  }
  if (!jornayaLeadId) {
    throw new Error("jornaya_lead_id is missing or null");
  }
  if (!certUrl) {
    throw new Error("cert_url is missing or null");
  }

  if (jornayaLeadId && certUrl) {
    console.log("jornaya_lead_id:", jornayaLeadId);
    console.log("cert_url:", certUrl);
  }
  // Close the API request context
  await apiContext.dispose();
}

module.exports = { tryCheckLead };
