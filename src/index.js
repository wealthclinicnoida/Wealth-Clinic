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
      { uid: "api::city-local-living-guide.city-local-living-guide", label: "city-local-living-guide" },
      { uid: "api::legal-documentation-guide.legal-documentation-guide", label: "legal-documentation-guide" },
      { uid: "api::home-interior.home-interior", label: "home-interior" },
      { uid: "api::luxury-real-estate.luxury-real-estate", label: "luxury-real-estate" },
      { uid: "api::real-estate-vastu-guide.real-estate-vastu-guide", label: "real-estate-vastu-guide" },
      { uid: "api::real-estate-news.real-estate-news", label: "real-estate-news" },
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
