'use strict';

/**
 * home-interior controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::home-interior.home-interior', ({ strapi }) => ({
  async find(ctx) {
    const response = await super.find(ctx);

    const slugFilter = ctx.query?.filters?.Slug_Url;
    const entry = response.data?.[0];

    if (slugFilter && entry) {
      try {
        await strapi.db.connection('home_interiors').where({ id: entry.id }).increment('views', 1);
        const updated = await strapi.db.query('api::home-interior.home-interior').findOne({
          where: { id: entry.id },
          select: ['views'],
        });
        entry.attributes.views = updated.views;
      } catch (error) {
        strapi.log.error('Failed to increment home-interior views:', error);
      }
    }

    return response;
  },
}));
