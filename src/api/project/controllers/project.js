"use strict";

/**
 * project controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::project.project", ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    console.log("==========hello=========");

    const modifiedData = await Promise.all(
      data.map(async (property) => {
        const ratings = property.attributes.rating_reviews.data;

        if (ratings.length > 0) {
          const totalRating = ratings.reduce(
            (sum, review) => sum + review.attributes.rantingStar,
            0
          );
          const averageRating = totalRating / ratings.length;
          property.attributes.totalRating = averageRating;
        } else {
          property.attributes.totalRating = 0;
        }

        return property;
      })
    );

    return { data: modifiedData, meta };
  },

  async findOne(ctx) {
    const { data } = await super.findOne(ctx);

    const ratings = data.attributes.rating_reviews.data;

    if (ratings.length > 0) {
      const totalRating = ratings.reduce(
        (sum, review) => sum + review.attributes.rantingStar,
        0
      );
      const averageRating = totalRating / ratings.length;
      data.attributes.totalRating = averageRating;
    } else {
      data.attributes.totalRating = 0;
    }

    return { data };
  },
}));
