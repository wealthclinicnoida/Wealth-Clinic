"use strict";

/**
 * project-view controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::project-view.project-view",
  ({ strapi }) => ({
    async create(ctx) {
      // @ts-ignore
      const { data } = ctx.request.body;

      if (!data || !data.projectId || !data.ipAddress) {
        return ctx.badRequest("Missing required fields");
      }

      const { projectId, ipAddress } = data;

      try {
        // Check if a view already exists for the given projectId
        const existingView = await strapi.db
          .query("api::project-view.project-view")
          .findOne({
            where: { projectId },
          });

        if (existingView) {
          // Update the existing view with new IP address if it's not already present
          const ipAddresses = existingView.ipAddress || [];
          if (!ipAddresses.includes(ipAddress)) {
            ipAddresses.push(ipAddress);
          }
          await strapi.db.query("api::project-view.project-view").update({
            where: { id: existingView.id },
            data: {
              ipAddress: ipAddresses,
            },
          });

          const uniqueIPCount = ipAddresses.length;
          return ctx.send({
            message: "View updated successfully.",
            data: { viewCount: uniqueIPCount },
          });
        } else {
          // Create a new view entry
          const newView = await strapi.db
            .query("api::project-view.project-view")
            .create({
              data: {
                projectId,
                ipAddress: [ipAddress],
              },
            });
          console.log(newView);
          return ctx.send({
            message: "View created successfully.",
            data: { viewCount: 1 },
          });
        }
      } catch (error) {
        console.error("Error during view creation or update:", error);
        return ctx.internalServerError(
          "An error occurred while processing your request."
        );
      }
    },
  })
);
