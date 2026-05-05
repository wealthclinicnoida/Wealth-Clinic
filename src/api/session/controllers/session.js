'use strict';

module.exports = {

  // =========================
  // 🔹 UPSERT SESSION
  // =========================
  async upsertSession(ctx) {
    const { sessionId, email, playerId } = ctx.request.body;

    if (!sessionId) {
      return ctx.badRequest('sessionId required');
    }

    const now = new Date();

    let existing = await strapi.entityService.findMany(
      'api::session.session',
      { filters: { sessionId }, limit: 1 }
    );

    let session;

    if (existing.length > 0) {
      session = await strapi.entityService.update(
        'api::session.session',
        existing[0].id,
        {
          data: {
            email,
            playerId,
            lastActiveAt: now,
            isActive: true
          }
        }
      );
    } else {
      session = await strapi.entityService.create(
        'api::session.session',
        {
          data: {
            sessionId,
            email,
            playerId,
            lastActiveAt: now,
            isActive: true,
            wishlist: [],
            lastViewed: [],
            lastSearched: []
          }
        }
      );
    }

    return ctx.send({ success: true, data: session });
  },

  // =========================
  // 🔥 WISHLIST
  // =========================

  async createWishlist(ctx) {
    const { sessionId, name } = ctx.request.body;

    let session = await strapi.entityService.findMany(
      'api::session.session',
      { filters: { sessionId }, limit: 1 }
    );

    if (!session.length) return ctx.badRequest('Session not found');

    session = session[0];

    const wishlists = session.wishlist || [];

    if (wishlists.find(w => w.name === name)) {
      return ctx.send({ message: 'Wishlist exists' });
    }

    wishlists.push({ name, items: [] });

    await strapi.entityService.update('api::session.session', session.id, {
      data: { wishlist: wishlists },
    });

    return ctx.send({ success: true });
  },

  async getWishlists(ctx) {
    const { sessionId } = ctx.query;

    const session = await strapi.entityService.findMany(
      'api::session.session',
      { filters: { sessionId }, limit: 1 }
    );

    return ctx.send({
      wishlists: session[0]?.wishlist || [],
    });
  },

  async addToWishlist(ctx) {
    const { sessionId, propertyId, propertyName, price } = ctx.request.body;

    let session = await strapi.entityService.findMany(
      'api::session.session',
      { filters: { sessionId }, limit: 1 }
    );

    if (!session.length) return ctx.badRequest('Session not found');

    session = session[0];


    if (wishlist?.find(i => i.propertyId === propertyId)) {
      return ctx.send({ message: 'Already exists' });
    }

    wishlist.push({ propertyId, propertyName, price });

    if (wishlist.length > 50) wishlist.shift();

    await strapi.entityService.update('api::session.session', session.id, {
      data: { wishlist: wishlists },
    });

    return ctx.send({ success: true });
  },

  async updateWishlistItem(ctx) {
    const { sessionId, wishlistName, propertyId, updates } = ctx.request.body;

    let session = await strapi.entityService.findMany(
      'api::session.session',
      { filters: { sessionId }, limit: 1 }
    );

    if (!session.length) return ctx.badRequest('Session not found');

    session = session[0];

    const wishlists = session.wishlist || [];
    const wishlist = wishlists.find(w => w.name === wishlistName);

    if (!wishlist) return ctx.badRequest('Wishlist not found');

    const item = wishlist.items.find(i => i.propertyId === propertyId);

    if (!item) return ctx.badRequest('Item not found');

    Object.assign(item, updates);

    await strapi.entityService.update('api::session.session', session.id, {
      data: { wishlist: wishlists },
    });

    return ctx.send({ success: true });
  },

  async removeFromWishlist(ctx) {
    const { sessionId, wishlistName, propertyId } = ctx.request.body;

    let session = await strapi.entityService.findMany(
      'api::session.session',
      { filters: { sessionId }, limit: 1 }
    );

    if (!session.length) return ctx.badRequest('Session not found');

    session = session[0];

    const wishlists = session.wishlist || [];
    const wishlist = wishlists.find(w => w.name === wishlistName);

    if (!wishlist) return ctx.badRequest('Wishlist not found');

    wishlist.items = wishlist.items.filter(
      i => i.propertyId !== propertyId
    );

    await strapi.entityService.update('api::session.session', session.id, {
      data: { wishlist: wishlists },
    });

    return ctx.send({ success: true });
  },

  // =========================
  // 👀 LAST VIEWED
  // =========================

  async addViewed(ctx) {
    const { sessionId, propertyId, propertyName, price } = ctx.request.body;

    let session = await strapi.entityService.findMany(
      'api::session.session',
      { filters: { sessionId }, limit: 1 }
    );

    if (!session.length) return ctx.badRequest('Session not found');

    session = session[0];

    let viewed = session.lastViewed || [];

    viewed = viewed.filter(v => v.propertyId !== propertyId);
    viewed.unshift({ propertyId, propertyName, price });

    if (viewed.length > 10) viewed.pop();

    await strapi.entityService.update('api::session.session', session.id, {
      data: { lastViewed: viewed },
    });

    return ctx.send({ success: true });
  },

  async getViewed(ctx) {
    const { sessionId } = ctx.query;

    const session = await strapi.entityService.findMany(
      'api::session.session',
      { filters: { sessionId }, limit: 1 }
    );

    return ctx.send({
      viewed: session[0]?.lastViewed || [],
    });
  },

  async removeViewed(ctx) {
    const { sessionId, propertyId } = ctx.request.body;

    let session = await strapi.entityService.findMany(
      'api::session.session',
      { filters: { sessionId }, limit: 1 }
    );

    if (!session.length) return ctx.badRequest('Session not found');

    session = session[0];

    let viewed = session.lastViewed || [];

    viewed = viewed.filter(v => v.propertyId !== propertyId);

    await strapi.entityService.update('api::session.session', session.id, {
      data: { lastViewed: viewed },
    });

    return ctx.send({ success: true });
  },

  // =========================
  // 🔍 LAST SEARCHED
  // =========================

  async addSearched(ctx) {
    const { sessionId, searchQuery, city, type } = ctx.request.body;

    let session = await strapi.entityService.findMany(
      'api::session.session',
      { filters: { sessionId }, limit: 1 }
    );

    if (!session.length) return ctx.badRequest('Session not found');

    session = session[0];

    let searched = session.lastSearched || [];

    searched.unshift({
      searchQuery,
      city,
      type,
      timestamp: new Date(),
    });

    if (searched.length > 10) searched.pop();

    await strapi.entityService.update('api::session.session', session.id, {
      data: { lastSearched: searched },
    });

    return ctx.send({ success: true });
  },

  async getSearched(ctx) {
    const { sessionId } = ctx.query;

    const session = await strapi.entityService.findMany(
      'api::session.session',
      { filters: { sessionId }, limit: 1 }
    );

    return ctx.send({
      searched: session[0]?.lastSearched || [],
    });
  },

  async clearSearched(ctx) {
    const { sessionId } = ctx.request.body;

    let session = await strapi.entityService.findMany(
      'api::session.session',
      { filters: { sessionId }, limit: 1 }
    );

    if (!session.length) return ctx.badRequest('Session not found');

    session = session[0];

    await strapi.entityService.update('api::session.session', session.id, {
      data: { lastSearched: [] },
    });

    return ctx.send({ success: true });
  }

};
