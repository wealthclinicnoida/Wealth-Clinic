module.exports = {
  routes: [

    // SESSION
    {
      method: "POST",
      path: "/session/upsert",
      handler: "session.upsert",
    },
    {
      method: "GET",
      path: "/session/:sessionId",
      handler: "session.get",
    },
    {
      method: "PUT",
      path: "/session/:sessionId",
      handler: "session.update",
    },
    {
      method: "DELETE",
      path: "/session/:sessionId",
      handler: "session.delete",
    },

    // WISHLIST
    {
      method: "POST",
      path: "/session/wishlist/add",
      handler: "session.addWishlist",
    },
    {
      method: "GET",
      path: "/session/wishlist/:sessionId",
      handler: "session.getWishlist",
    },
    {
      method: "DELETE",
      path: "/session/wishlist/remove",
      handler: "session.removeWishlist",
    },

    // VIEWED
    {
      method: "POST",
      path: "/session/viewed/add",
      handler: "session.addViewed",
    },
    {
      method: "GET",
      path: "/session/viewed/:sessionId",
      handler: "session.getViewed",
    },
    {
      method: "DELETE",
      path: "/session/viewed/clear",
      handler: "session.clearViewed",
    },

    // SEARCH
    {
      method: "POST",
      path: "/session/search/add",
      handler: "session.addSearch",
    },
    {
      method: "GET",
      path: "/session/search/:sessionId",
      handler: "session.getSearch",
    },
    {
      method: "DELETE",
      path: "/session/search/clear",
      handler: "session.clearSearch",
    },

  ],
};
