'use strict';

module.exports = {

 async addItem(ctx) {
  const { sessionId, propertyId, propertyName, price } = ctx.request.body;

  if (!sessionId || !propertyId) {
    return ctx.badRequest('sessionId & propertyId required');
  }

  let wishlist = await strapi.entityService.findMany('api::wishlist.wishlist', {
    filters: { sessionId },
    populate: ['items'],
    limit: 1
  });

  if (!wishlist.length) {
    wishlist = await strapi.entityService.create('api::wishlist.wishlist', {
      data: {
        sessionId,
        items: [{ propertyId, propertyName, price }]
      }
    });
  } else {
    wishlist = wishlist[0];

    const items = wishlist.items || [];

    // ✅ Prevent duplicate
    if (items.find(i => i.propertyId === propertyId)) {
      return ctx.send({ message: 'Already in wishlist' });
    }

    items.push({ propertyId, propertyName, price });

    await strapi.entityService.update('api::wishlist.wishlist', wishlist.id, {
      data: { items }
    });
  }

  return ctx.send({ success: true });
},
async removeItem(ctx) {
  const { sessionId, propertyId } = ctx.request.body;

  if (!sessionId || !propertyId) {
    return ctx.badRequest('sessionId & propertyId required');
  }

  const wishlist = await strapi.entityService.findMany('api::wishlist.wishlist', {
    filters: { sessionId },
    populate: ['items'],
    limit: 1
  });

  if (!wishlist.length) return ctx.send({});

  const updatedItems = (wishlist[0].items || []).filter(
    i => i.propertyId !== propertyId
  );

  await strapi.entityService.update('api::wishlist.wishlist', wishlist[0].id, {
    data: { items: updatedItems }
  });

  return ctx.send({ success: true });
},

 async getWishlist(ctx) {
  const { sessionId } = ctx.query;

  if (!sessionId) {
    return ctx.badRequest('sessionId required');
  }

  const wishlist = await strapi.entityService.findMany('api::wishlist.wishlist', {
    filters: { sessionId },
    populate: ['items'],
    limit: 1
  });

  return ctx.send({
    items: wishlist[0]?.items || []
  });
};
