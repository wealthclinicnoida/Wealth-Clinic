module.exports = {
  routes: [
    {
      method: "POST",
      path: "/zoho-form",
      handler: "zoho-form.postZohoForm",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
