'use strict';

/**
 * blog controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog.blog', ({ strapi }) => ({
  async find(ctx) {
    const response = await super.find(ctx);

    const slugFilter = ctx.query?.filters?.Slug_Url;
    const entry = response.data?.[0];

    if (slugFilter && entry) {
      try {
        const newViews = (entry.attributes.views || 0) + 1;
        await strapi.db.query('api::blog.blog').update({
          where: { id: entry.id },
          data: { views: newViews },
        });
        entry.attributes.views = newViews;
      } catch (error) {
        strapi.log.error('Failed to increment blog views:', error);
      }
    }

    return response;
  },
}));
