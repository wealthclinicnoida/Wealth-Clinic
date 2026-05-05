'use strict';

module.exports = {
  routes: [
    // 🔹 SESSION
    {
      method: 'POST',
      path: '/session/upsert',
      handler: 'session.upsertSession',
      config: { auth: false },
    },

    // =========================
    // 🔥 WISHLIST
    // =========================
    {
      method: 'POST',
      path: '/session/wishlist',
      handler: 'session.createWishlist',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/session/wishlist',
      handler: 'session.getWishlists',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/session/wishlist/item',
      handler: 'session.addToWishlist',
      config: { auth: false },
    },
    {
      method: 'PUT',
      path: '/session/wishlist/item',
      handler: 'session.updateWishlistItem',
      config: { auth: false },
    },
    {
      method: 'DELETE',
      path: '/session/wishlist/item',
      handler: 'session.removeFromWishlist',
      config: { auth: false },
    },

    // =========================
    // 👀 LAST VIEWED
    // =========================
    {
      method: 'POST',
      path: '/session/viewed',
      handler: 'session.addViewed',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/session/viewed',
      handler: 'session.getViewed',
      config: { auth: false },
    },
    {
      method: 'DELETE',
      path: '/session/viewed',
      handler: 'session.removeViewed',
      config: { auth: false },
    },

    // =========================
    // 🔍 LAST SEARCHED
    // =========================
    {
      method: 'POST',
      path: '/session/searched',
      handler: 'session.addSearched',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/session/searched',
      handler: 'session.getSearched',
      config: { auth: false },
    },
    {
      method: 'DELETE',
      path: '/session/searched',
      handler: 'session.clearSearched',
      config: { auth: false },
    },
  ],
};
