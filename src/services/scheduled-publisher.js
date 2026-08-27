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

async function publishScheduledContent(strapi) {
  const startedAt = new Date();

  let totalFound = 0;
  let totalPublished = 0;
  let totalErrors = 0;

  strapi.log.info(
    `[SCHEDULED-PUBLISHER] STARTED | ${startedAt.toISOString()}`
  );

  for (const { uid, label } of schedulerConfigs) {
    try {
      const now = new Date();

      const entries = await strapi.entityService.findMany(uid, {
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

      if (!entries || entries.length === 0) {
        strapi.log.info(
          `[SCHEDULED-PUBLISHER] ${label}: nothing to publish`
        );
        continue;
      }

      totalFound += entries.length;

      strapi.log.info(
        `[SCHEDULED-PUBLISHER] ${label}: ${entries.length} entry/entries found`
      );

      for (const entry of entries) {
        try {
          const publishedAt = new Date();

          await strapi.entityService.update(uid, entry.id, {
            data: {
              publishedAt,
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
            `[SCHEDULED-PUBLISHER] ✅ PUBLISHED | ${label} | ID=${entry.id} | "${title}" | ${publishedAt.toISOString()}`
          );
        } catch (error) {
          totalErrors++;

          strapi.log.error(
            `[SCHEDULED-PUBLISHER] ❌ PUBLISH FAILED | ${label} | ID=${entry.id} | ${error.message}`
          );
        }
      }
    } catch (error) {
      totalErrors++;

      strapi.log.error(
        `[SCHEDULED-PUBLISHER] ❌ ${label} ERROR | ${error.message}`
      );
    }
  }

  const finishedAt = new Date();
  const duration = finishedAt.getTime() - startedAt.getTime();

  strapi.log.info(
    `[SCHEDULED-PUBLISHER] 🏁 FINISHED | Found=${totalFound} | Published=${totalPublished} | Errors=${totalErrors} | Duration=${duration}ms`
  );

  return {
    found: totalFound,
    published: totalPublished,
    errors: totalErrors,
  };
}

module.exports = {
  publishScheduledContent,
};
