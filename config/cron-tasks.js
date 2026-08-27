"use strict";

module.exports = {
  blogSchedulerCron: {
    task: async ({ strapi }) => {
      const cronStartedAt = new Date();

      strapi.log.info(
        `[CRON] Scheduler started at ${cronStartedAt.toISOString()}`
      );

      const schedulerConfigs = [
        {
          uid: "api::blog.blog",
          label: "blog",
        },
        {
          uid: "api::ayodhya-blog.ayodhya-blog",
          label: "ayodhya blog",
        },
        {
          uid: "api::real-estate-news.real-estate-news",
          label: "real estate news",
        },
        {
          uid: "api::city-local-living-guide.city-local-living-guide",
          label: "city local living guide",
        },
        {
          uid: "api::home-interior.home-interior",
          label: "home interior",
        },
        {
          uid: "api::legal-documentation-guide.legal-documentation-guide",
          label: "legal documentation guide",
        },
        {
          uid: "api::luxury-real-estate.luxury-real-estate",
          label: "luxury real estate",
        },
        {
          uid: "api::real-estate-vastu-guide.real-estate-vastu-guide",
          label: "real estate vastu guide",
        },
      ];

      let totalPublished = 0;

      try {
        for (const { uid, label } of schedulerConfigs) {
          try {
            const now = new Date();

            const entriesToPublish = await strapi.entityService.findMany(uid, {
              publicationState: "preview",

              filters: {
                publishedAt: {
                  $null: true,
                },

                ScheduledAt: {
                  $notNull: true,
                  $lte: now,
                },
              },

              limit: 100,
            });

            if (!entriesToPublish || entriesToPublish.length === 0) {
              strapi.log.info(
                `[CRON] ${label}: No scheduled entries ready for publishing.`
              );

              continue;
            }

            strapi.log.info(
              `[CRON] ${label}: Found ${entriesToPublish.length} entry/entries ready to publish.`
            );

            for (const entry of entriesToPublish) {
              try {
                const publishTime = new Date();

                await strapi.entityService.update(uid, entry.id, {
                  data: {
                    publishedAt: publishTime,
                  },
                });

                totalPublished++;

                const title =
                  entry.Title ||
                  entry.title ||
                  entry.Name ||
                  entry.name ||
                  `ID ${entry.id}`;

                strapi.log.info(
                  `[CRON] ✅ Published ${label} #${entry.id} "${title}" at ${publishTime.toISOString()}`
                );
              } catch (error) {
                strapi.log.error(
                  `[CRON] ❌ Failed to publish ${label} #${entry.id}`,
                  error
                );
              }
            }
          } catch (error) {
            strapi.log.error(
              `[CRON] ❌ Error processing ${label}`,
              error
            );
          }
        }

        const cronFinishedAt = new Date();

        strapi.log.info(
          `[CRON] Scheduler finished at ${cronFinishedAt.toISOString()}`
        );

        strapi.log.info(
          `[CRON] Total entries published: ${totalPublished}`
        );
      } catch (error) {
        strapi.log.error(
          "[CRON] ❌ Fatal error in scheduled content scheduler",
          error
        );
      }
    },

    options: {
      rule: "* * * * *",
    },
  },
};
