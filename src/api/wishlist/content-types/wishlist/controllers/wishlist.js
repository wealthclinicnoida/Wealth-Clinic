'use strict';

module.exports = {

  async addItem(ctx) {
    const { sessionId, propertyId, propertyName } = ctx.request.body;

    if (!sessionId || !propertyId) {
      return ctx.badRequest('sessionId and propertyId required');
    }

    // find or create wishlist
    let wishlist = await strapi.entityService.findMany('api::wishlist.wishlist', {
      filters: { sessionId },
      populate: ['items'],
      limit: 1
    });

    if (wishlist.length === 0) {
      wishlist = await strapi.entityService.create('api::wishlist.wishlist', {
        data: { sessionId }
      });
    } else {
      wishlist = wishlist[0];
    }

    // prevent duplicate
    const exists = wishlist.items?.find(i => i.propertyId === propertyId);
    if (exists) {
      return ctx.send({ message: 'Already added' });
    }

    // create item
    const item = await strapi.entityService.create('api::wishlist-item.wishlist-item', {
      data: {
        propertyId,
        propertyName,
        wishlist: wishlist.id
      }
    });

    return ctx.send({ success: true, item });
  },

  async removeItem(ctx) {
    const { propertyId } = ctx.request.body;

    const items = await strapi.entityService.findMany('api::wishlist-item.wishlist-item', {
      filters: { propertyId }
    });

    for (const item of items) {
      await strapi.entityService.delete('api::wishlist-item.wishlist-item', item.id);
    }

    return ctx.send({ success: true });
  },

  async getWishlist(ctx) {
    const { sessionId } = ctx.query;

    const wishlist = await strapi.entityService.findMany('api::wishlist.wishlist', {
      filters: { sessionId },
      populate: ['items'],
      limit: 1
    });

    return ctx.send(wishlist[0] || {});
  }
};