// module.exports = {
//   routes: [
//     {
//       method: "POST",
//       path: "/zoho-form",
//       handler: "zoho-form.postZohoForm",
//       config: {
//         policies: [],
//         middlewares: [],
//       },
//     },
//   ],
// };

const axios = require("axios");

const ZOHO_AUTH_URL = "https://accounts.zoho.com/oauth/v2/token";
const ZOHO_API_URL =
  "https://www.zohoapis.com/crm/v2/functions/property_wala/actions/execute";

const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REFRESH_TOKEN = "YOUR_REFRESH_TOKEN";

async function getAccessToken() {
  const params = new URLSearchParams({
    refresh_token: REFRESH_TOKEN,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "refresh_token",
  });

  const { data } = await axios.post(ZOHO_AUTH_URL, params);
  return data.access_token;
}

module.exports = {
  async postZohoForm(ctx) {
    try {
      const accessToken = await getAccessToken();

      const params = getZohoParams(ctx);

      const response = await axios.post(
        ZOHO_API_URL,
        {},
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
          },
          params, // Zoho still expects params
        }
      );

      console.log("Zoho Response:", response.data);
      ctx.send(response.data);
    } catch (error) {
      console.error("Zoho Error:", error.response?.data || error.message);
      ctx.throw(500, "Error while submitting Zoho form");
    }
  },
};

function getZohoParams(ctx) {
  let OWNER_ID;
  const {
    Contact_ID,
    Last_Name,
    Email,
    Mobile,
    Query,
    Locationn,
    Budget,
    Lead_Source1,
    Lead_Type,
    Rating,
    Lead_Priority,
    Stage,
    Temp_Field_3,
    Property_Type,
  } = ctx.request.body;

  if (Property_Type === "Residential" || Property_Type === "Commercial") {
    OWNER_ID = 3664837000059055171;
  } else {
    OWNER_ID = 3664837000038157001;
  }

  return {
    Contact_ID,
    Last_Name,
    Email,
    Mobile,
    Query,
    Locationn,
    Budget,
    Lead_Source1,
    Lead_Type,
    Rating,
    Lead_Priority,
    Stage,
    Temp_Field_3,
    Property_Type,
    Owner: OWNER_ID,
  };
}
