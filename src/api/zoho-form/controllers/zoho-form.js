const axios = require("axios");

module.exports = {
  async postZohoForm(ctx) {
    const ZOHO_API_URL =
      "https://www.zohoapis.com/crm/v2/functions/property_wala/actions/execute";
    const API_KEY =
      "1003.1e4337563bdfd4d5d09450bda8cfcf36.6c69bb448b86aa64654ef89ca2018684";
    const OWNER_ID = 3664837000038157001;

    const HEADER = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        auth_type: "apikey",
        zapikey: API_KEY,
      },
    };
    try {
      const zohoFormParams = getZohoParams(ctx);

      const response = await axios.post(ZOHO_API_URL, zohoFormParams, HEADER);
      // console.log("==========", response.data, "------>", zohoFormParams);
      ctx.send(response.data);
    } catch (error) {
      console.error("Error submitting zoho form:", error);
      ctx.throw(500, "An error occurred while submitting the form");
    }
  },
};

const getZohoParams = (ctx) => {
  const {
    Contact_ID,
    Last_Name,
    Email,
    Mobile,
    Query,
    Location,
    Budget,
    Lead_Source1,
    Lead_Type, //whatsapp/ PhoneCall Type
    Rating,
    Lead_Priority,
    Stage,
    Temp_Field_3, // form Name
    // Owner_testing,
  } = ctx.request.body;
  return {
    Contact_ID,
    Last_Name,
    Email,
    Mobile,
    Query,
    Location,
    Budget,
    Lead_Source1,
    Lead_Type, //whatsapp/ PhoneCall Type
    Rating,
    Lead_Priority,
    Stage,
    Temp_Field_3, // form Name
    // Owner_testing,
  };
};
