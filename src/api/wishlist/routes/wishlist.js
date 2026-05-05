'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/wishlist/add',
      handler: 'wishlist.addItem',
      config: { auth: false }
    },
    {
      method: 'POST',
      path: '/wishlist/remove',
      handler: 'wishlist.removeItem',
      config: { auth: false }
    },
    {
      method: 'GET',
      path: '/wishlist',
      handler: 'wishlist.getWishlist',
      config: { auth: false }
    }
  ]
};