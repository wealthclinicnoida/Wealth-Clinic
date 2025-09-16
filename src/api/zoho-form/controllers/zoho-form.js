const axios = require("axios");

module.exports = {
  async postZohoForm(ctx) {
    const ZOHO_API_URL =
      "https://www.zohoapis.com/crm/v2/functions/property_wala/actions/execute?";
    const API_KEY =
      "1003.1e4337563bdfd4d5d09450bda8cfcf36.6c69bb448b86aa64654ef89ca2018684";
    if(

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
      // const zohoFormParams = getZohoParams(ctx);
      // const response = await axios.post(ZOHO_API_URL, zohoFormParams, HEADER);

      const zohoFormParamsUrl = getZohoParams(ctx);
      const response = await axios.post(zohoFormParamsUrl);

      // console.log("==========", response.data);
      ctx.send(response.data);
    } catch (error) {
      console.error("Error submitting zoho form:", error);
      ctx.throw(500, "An error occurred while submitting the form");
    }
  },
};

const getZohoParams = (ctx) => {
  let OWNER_ID 
  const {
    Contact_ID,
    Last_Name,
    Email,
    Mobile,
    Query,
    Locationn,
    Budget,
    Lead_Source1,
    Lead_Type, //whatsapp/ PhoneCall Type
    Rating,
    Lead_Priority,
    Stage,
    Temp_Field_3, // form Name
    // Owner_testing,
    Property_Type,
  } = ctx.request.body;
if(Property_Type === "Residential" || Property_Type === "Commercial"){
  OWNER_ID = 3664837000059055171
  else OWNER_ID = = 3664837000038157001;
  
  // const newUrl = `
  //   https://www.zohoapis.com/crm/v2/functions/property_wala/actions/execute?auth_type=apikey&zapikey=1003.1e4337563bdfd4d5d09450bda8cfcf36.6c69bb448b86aa64654ef89ca2018684&Contact_ID=${Contact_ID}&Last_Name=${Last_Name}&Mobile=${Mobile}&Query=${Query}&Locationn=${Locationn}&Budget=${Budget}&Lead_Source1=${Lead_Source1}&Lead_Type=${Lead_Type}&Rating=${Rating}&Lead_Priority=${Lead_Priority}&Stage=${Stage}&Temp_Field_3=${Temp_Field_3}&Owner testing=${OWNER_ID}
  // `;

  const newUrl = `https://www.zohoapis.com/crm/v2/functions/property_wala/actions/execute?auth_type=apikey&zapikey=1003.1e4337563bdfd4d5d09450bda8cfcf36.6c69bb448b86aa64654ef89ca2018684&Contact_ID=${Contact_ID}&Last_Name=${Last_Name}&Email=${Email}&Mobile=${Mobile}&Query=${Query}&Locationn=${Locationn}&Budget=${Budget}&Lead_Source1=${Lead_Source1}&Lead_Type=${Lead_Type}&Rating=${Rating}&Lead_Priority=${Lead_Priority}&Stage=${Stage}&Temp_Field_3=${Temp_Field_3}&Property_Type=${Property_Type}&Owner=${OWNER_ID}`;

  const newObj = {
    Contact_ID,
    Last_Name,
    Email,
    Mobile,
    Query,
    Locationn,
    Budget,
    Lead_Source1,
    Lead_Type, //whatsapp/ PhoneCall Type
    Rating,
    Lead_Priority,
    Stage,
    Temp_Field_3, // form Name
    Owner_testing: OWNER_ID,
  };

  return newUrl;
};
