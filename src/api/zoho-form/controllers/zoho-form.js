const axios = require("axios");

module.exports = {
  async postZohoForm(ctx) {
    try {
      const zohoFormParamsUrl = await getZohoParams(ctx);

      if (!zohoFormParamsUrl) {
        throw new Error("Zoho URL generation failed");
      }

      const response = await axios.post(zohoFormParamsUrl, null, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      ctx.send(response.data);
    } catch (error) {
      console.error("Error submitting zoho form:", error?.response?.data || error.message);
      ctx.throw(500, "An error occurred while submitting the form");
    }
  },
};

const getZohoParams = async (ctx) => {
  const OWNER_ID = 3664837000038157001;

  const {
    Contact_ID,
    Last_Name,
    Email,
    Mobile,
    Query,
    Locationn,
    Budget,
    Lead_Source1,
    Lead_Type, // whatsapp/PhoneCall Type
    Rating,
    Lead_Priority,
    Stage,
    Temp_Field_3, // form Name
    Property_Type,
  } = ctx.request.body;

  // ✅ Select Owner based on property type
  const Owner =
    Property_Type === "Residential" || Property_Type === "Commercial"
      ? 3664837000059055171
      : OWNER_ID;

  // ✅ Construct URL safely
  const newUrl = `https://www.zohoapis.com/crm/v2/functions/property_wala/actions/execute?auth_type=apikey&zapikey=1003.1e4337563bdfd4d5d09450bda8cfcf36.6c69bb448b86aa64654ef89ca2018684&Contact_ID=${encodeURIComponent(
    Contact_ID || ""
  )}&Last_Name=${encodeURIComponent(
    Last_Name || ""
  )}&Email=${encodeURIComponent(
    Email || ""
  )}&Mobile=${encodeURIComponent(
    Mobile || ""
  )}&Query=${encodeURIComponent(
    Query || ""
  )}&Locationn=${encodeURIComponent(
    Locationn || ""
  )}&Budget=${encodeURIComponent(
    Budget || ""
  )}&Lead_Source1=${encodeURIComponent(
    Lead_Source1 || ""
  )}&Lead_Type=${encodeURIComponent(
    Lead_Type || ""
  )}&Rating=${encodeURIComponent(
    Rating || ""
  )}&Lead_Priority=${encodeURIComponent(
    Lead_Priority || ""
  )}&Stage=${encodeURIComponent(
    Stage || ""
  )}&Temp_Field_3=${encodeURIComponent(
    Temp_Field_3 || ""
  )}&Property_Type=${encodeURIComponent(
    Property_Type || ""
  )}&Owner=${Owner}`;

  return newUrl;
};
