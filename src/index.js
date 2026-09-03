"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }) {
    strapi.log.info("==============================================");
    strapi.log.info("🚀 Strapi application bootstrap completed");
    strapi.log.info("📅 Scheduled content cron is configured");
    strapi.log.info("==============================================");

    // Backfill views=1000 for entries created before the views field existed.
    // New entries already default to views=0, so they are never null and are skipped.
    const viewsBackfillTargets = [
      { uid: "api::blog.blog", label: "blog" },
      { uid: "api::project.project", label: "project" },
    ];

    for (const { uid, label } of viewsBackfillTargets) {
      try {
        const { count } = await strapi.db.query(uid).updateMany({
          where: { views: null },
          data: { views: 1000 },
        });
        if (count > 0) {
          strapi.log.info(`Backfilled views=1000 for ${count} existing ${label} entries`);
        }
      } catch (error) {
        strapi.log.error(`Failed to backfill views for ${label}:`, error);
      }
    }
  },
};
