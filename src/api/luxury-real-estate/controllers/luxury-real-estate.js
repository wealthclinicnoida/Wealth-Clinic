'use strict';

/**
 * luxury-real-estate controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::luxury-real-estate.luxury-real-estate', ({ strapi }) => ({
  async find(ctx) {
    const response = await super.find(ctx);

    const slugFilter = ctx.query?.filters?.Slug_Url;
    const entry = response.data?.[0];

    if (slugFilter && entry) {
      try {
        await strapi.db.connection('luxury_real_estates').where({ id: entry.id }).increment('views', 1);
        const updated = await strapi.db.query('api::luxury-real-estate.luxury-real-estate').findOne({
          where: { id: entry.id },
          select: ['views'],
        });
        entry.attributes.views = updated.views;
      } catch (error) {
        strapi.log.error('Failed to increment luxury-real-estate views:', error);
      }
    }

    return response;
  },
}));
