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
  bootstrap({ strapi }) {
    strapi.log.info("==============================================");
    strapi.log.info("🚀 Strapi application bootstrap completed");
    strapi.log.info("📅 Scheduled content cron is configured");
    strapi.log.info("==============================================");
  },
};
