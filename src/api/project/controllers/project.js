"use strict";

/**
 * project controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::project.project", ({ strapi }) => ({
  async find(ctx) {
    const response = await super.find(ctx);

    const slugFilter = ctx.query?.filters?.Slug_Url;
    const entry = response.data?.[0];

    if (slugFilter && entry) {
      try {
        await strapi.db.connection("projects").where({ id: entry.id }).increment("views", 1);
        const updated = await strapi.db.query("api::project.project").findOne({
          where: { id: entry.id },
          select: ["views"],
        });
        entry.attributes.views = updated.views;
      } catch (error) {
        strapi.log.error("Failed to increment project views:", error);
      }
    }

    return response;
  },
}));

// module.exports = createCoreController("api::project.project", ({ strapi }) => ({
//   async find(ctx) {
//     const { data, meta } = await super.find(ctx);
//     // console.log("==========hello=========");

//     const modifiedData = await Promise.all(
//       data.map(async (property) => {
//         const ratings = property.attributes.project_ratings.data;

//         if (ratings.length > 0) {
//           const totalRating = ratings.reduce(
//             (sum, review) => sum + review.attributes.ratingStar,
//             0
//           );
//           const averageRating = totalRating / ratings.length;
//           property.attributes.totalRating = averageRating;
//         } else {
//           property.attributes.totalRating = 0;
//         }

//         return property;
//       })
//     );

//     return { data: modifiedData, meta };
//   },

//   async findOne(ctx) {
//     const { data } = await super.findOne(ctx);

//     const ratings = data.attributes.project_ratings.data;

//     if (ratings.length > 0) {
//       const totalRating = ratings.reduce(
//         (sum, review) => sum + review.attributes.ratingStar,
//         0
//       );
//       const averageRating = totalRating / ratings.length;
//       data.attributes.totalRating = averageRating;
//     } else {
//       data.attributes.totalRating = 0;
//     }

//     return { data };
//   },
// }));
