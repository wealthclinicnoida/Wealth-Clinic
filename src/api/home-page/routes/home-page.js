module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/home-page',
      handler: 'home-page.index',
      config: {
        auth: false,
      },
    },
  ],
};
