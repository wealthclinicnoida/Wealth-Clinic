'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::project.project", ({ strapi }) => ({
  async find(ctx) {
    const { Project_Name } = ctx.query;

    const filters = {};

    if (Project_Name) {
      filters.$or = [
        { Project_Name: { $containsi: Project_Name } },
        { category: { $containsi: Project_Name } },
        { sub_categories: { $containsi: Project_Name } },
        { Min_Price: { $containsi: Project_Name } }, // Budget must be string or converted
      ];
    }

    // Inject filters into query with default populate & sort
    ctx.query = {
      ...ctx.query,
      filters,
      populate: '*',
      sort: 'projectSequence:asc',
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    const { data } = await super.findOne(ctx);
    return { data };
  },
}));
