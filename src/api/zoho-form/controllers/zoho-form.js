const axios = require("axios");

module.exports = {
  async postZohoForm(ctx) {
    try {
      const zohoFormParamsUrl = await getZohoParams(ctx); // ✅ wait for URL

      if (!zohoFormParamsUrl) {
        throw new Error("Zoho URL generation failed");
      }

      const response = await axios.post(zohoFormParamsUrl);

      ctx.send(response.data);
    } catch (error) {
      console.error("Error submitting zoho form:", error);
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
    Lead_Type,
    Rating,
    Lead_Priority,
    Stage,
    Temp_Field_3,
    Property_Type,
  } = ctx.request.body;

  let newUrl = "";

  if (Property_Type === "Residential" || Property_Type === "Commercial") {
    newUrl = `https://www.zohoapis.com/crm/v2/functions/property_wala/actions/execute?auth_type=apikey&zapikey=1003.1e4337563bdfd4d5d09450bda8cfcf36.6c69bb448b86aa64654ef89ca2018684&Contact_ID=${Contact_ID}&Last_Name=${Last_Name}&Email=${Email}&Mobile=${Mobile}&Query=${Query}&Locationn=${Locationn}&Budget=${Budget}&Lead_Source1=${Lead_Source1}&Lead_Type=${Lead_Type}&Rating=${Rating}&Lead_Priority=${Lead_Priority}&Stage=${Stage}&Temp_Field_3=${Temp_Field_3}&Property_Type=${Property_Type}&Owner=3664837000059055171`;
  } else {
    newUrl = `https://www.zohoapis.com/crm/v2/functions/property_wala/actions/execute?auth_type=apikey&zapikey=1003.1e4337563bdfd4d5d09450bda8cfcf36.6c69bb448b86aa64654ef89ca2018684&Contact_ID=${Contact_ID}&Last_Name=${Last_Name}&Email=${Email}&Mobile=${Mobile}&Query=${Query}&Locationn=${Locationn}&Budget=${Budget}&Lead_Source1=${Lead_Source1}&Lead_Type=${Lead_Type}&Rating=${Rating}&Lead_Priority=${Lead_Priority}&Stage=${Stage}&Temp_Field_3=${Temp_Field_3}&Property_Type=${Property_Type}&Owner=3664837000038157001`;
  }

  return newUrl; // ✅ always returns a string
};
