const axios = require("axios");

module.exports = {
  async postZohoForm(ctx) {
    const ZOHO_API_URL =
      "https://www.zohoapis.com/crm/v2/functions/property_wala/actions/execute";
    const API_KEY =
      "1003.1e4337563bdfd4d5d09450bda8cfcf36.6c69bb448b86aa64654ef89ca2018684";
    const OWNER_ID = 3664837000038157001; //
    try {
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
        Owner_testing,
      } = ctx.request.body;

      const response = await axios({
        method: "post",
        url: "https://www.zohoapis.com/crm/v2/functions/property_wala/actions/execute",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          auth_type: "apikey",
          zapikey: API_KEY, // Ensure your actual API key is used
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
          Owner_testing: OWNER_ID,
        },
      });

      ctx.send(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      ctx.throw(500, "An error occurred while submitting the form");
    }
  },
};
