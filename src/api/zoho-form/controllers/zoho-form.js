const axios = require("axios");
const qs = require("querystring");

module.exports = {
  async postZohoForm(ctx) {
    const ZOHO_API_URL =
      "https://www.zohoapis.com/crm/v2/functions/property_wala/actions/execute";
   

    try {
      const params = getZohoParams(ctx); // build params safely

      const response = await axios.post(
        `${ZOHO_API_URL}?${qs.stringify(params)}`
      );

      console.log("Zoho Response:", response.data);
      ctx.send(response.data);
    } catch (error) {
      console.error(
        "Error submitting zoho form:",
        error.response?.data || error.message
      );
      ctx.throw(500, "An error occurred while submitting the form");
    }
  },
};

const getZohoParams = (ctx) => {
  let OWNER_ID;
   const API_KEY =
      "1003.1e4337563bdfd4d5d09450bda8cfcf36.6c69bb448b86aa64654ef89ca2018684";
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
    auth_type: "apikey",
    zapikey: API_KEY,
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
};
