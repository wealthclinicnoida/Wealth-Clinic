"use strict";

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

module.exports = {
  // Runs every minute
  "* * * * *": async ({ strapi }) => {
    const startedAt = new Date();

    // IST timestamp for easier reading in Cloud logs
    const istTime = startedAt.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
    });

    strapi.log.info(
      `[CRON] ❤️ HEARTBEAT - Scheduler started | IST: ${istTime}`
    );

    let totalFound = 0;
    let totalPublished = 0;
    let totalErrors = 0;

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
              `[CRON] ${label}: No scheduled entries ready`
            );

            continue;
          }

          totalFound += entriesToPublish.length;

          strapi.log.info(
            `[CRON] ${label}: Found ${entriesToPublish.length} entry/entries ready to publish`
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
                `[CRON] ✅ PUBLISHED | ${label} | ID: ${entry.id} | Title: "${title}" | Time: ${publishTime.toISOString()}`
              );
            } catch (error) {
              totalErrors++;

              strapi.log.error(
                `[CRON] ❌ FAILED TO PUBLISH | ${label} | ID: ${entry.id} | ${error.message}`
              );
            }
          }
        } catch (error) {
          totalErrors++;

          strapi.log.error(
            `[CRON] ❌ ERROR PROCESSING | ${label} | ${error.message}`
          );
        }
      }

      const finishedAt = new Date();

      const duration = finishedAt.getTime() - startedAt.getTime();

      const finishedIST = finishedAt.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });

      strapi.log.info(
        `[CRON] 🏁 FINISHED | IST: ${finishedIST} | Duration: ${duration}ms | Found: ${totalFound} | Published: ${totalPublished} | Errors: ${totalErrors}`
      );
    } catch (error) {
      strapi.log.error(
        `[CRON] 💥 FATAL ERROR | ${error.message}`
      );
    }
  },
};
