// @ts-nocheck
const axios = require("axios");
const fs = require("fs");

module.exports = {
  async postEmployeeForm(ctx) {
    try {
      const postUrl =
        "https://forms.zohopublic.com/wealthclinic/form/RecruitWebsite/formperma/6l1CQJLVvQipD4Ca4qP40re9Di3w1dDIRuHO7kTpB1s/htmlRecords/submit";

      const formData = new FormData();

      getFormData(formData, ctx);
      const response = await fetch(postUrl, {
        method: "POST",
        body: formData,
      });

      ctx.send(response.status);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      ctx.status = 500;
      ctx.body = { message: "Form submission failed" };
    }
  },
};

function getFormData(formData, ctx) {
  const {
    name,
    phone,
    email,
    location,
    preferLocation,
    expectedPackage,
    currentPackage,
    experience,
    photo,
    file,
    jobTitle,
  } = JSON.parse(ctx.request.body.data);

  formData.append("SingleLine", name);
  formData.append("PhoneNumber_countrycode", phone);
  formData.append("Email", email);
  formData.append("Dropdown3", experience);
  formData.append("Currency", currentPackage); // Current CTC
  formData.append("Currency1", expectedPackage); // Expected CTC
  formData.append("SingleLine1", location); // Current Location
  formData.append("SingleLine2", jobTitle); //job SingleLine2
  formData.append("Dropdown", preferLocation); // Preferred Job Location
  formData.append("Dropdown1", "Website"); // Source Website
  formData.append("Dropdown2", "New"); // Candidate Status
  //   if (photo) formData.append("ImageUpload", photo);
  //   if (file) formData.append("FileUpload", file);

  const files = ctx.request.files;
  if (files["files.photo"]) {
    const photoPath = ctx.request.files["files.photo"].path;
    formData.append("ImageUpload", fs.createReadStream(photoPath));
  }
  if (files["files.file"]) {
    const photoPath = ctx.request.files["files.file"].path;
    formData.append("FileUpload", fs.createReadStream(photoPath));
  }

  return formData;
}
