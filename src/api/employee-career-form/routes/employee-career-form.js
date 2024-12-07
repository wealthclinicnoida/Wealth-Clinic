module.exports = {
  routes: [
    {
      method: "POST",
      path: "/employee-career-form",
      handler: "employee-career-form.postEmployeeForm",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
