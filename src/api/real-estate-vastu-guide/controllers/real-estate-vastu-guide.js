'use strict';

/**
 * real-estate-vastu-guide controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::real-estate-vastu-guide.real-estate-vastu-guide', ({ strapi }) => ({
  async find(ctx) {
    const response = await super.find(ctx);

    const slugFilter = ctx.query?.filters?.Slug_Url;
    const entry = response.data?.[0];

    if (slugFilter && entry) {
      try {
        await strapi.db.connection('real_estate_vastu_guides').where({ id: entry.id }).increment('views', 1);
        const updated = await strapi.db.query('api::real-estate-vastu-guide.real-estate-vastu-guide').findOne({
          where: { id: entry.id },
          select: ['views'],
        });
        entry.attributes.views = updated.views;
      } catch (error) {
        strapi.log.error('Failed to increment real-estate-vastu-guide views:', error);
      }
    }

    return response;
  },
}));
