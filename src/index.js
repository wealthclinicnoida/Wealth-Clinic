"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // Setup project notification cron job
    // Runs every hour to check for unpublished projects and send notifications
    strapi.cron.add({
      projectNotificationCron: {
        task: async ({ strapi }) => {
          try {
            strapi.log.info('Running project notification cron job...');
            
            // Fetch recently created projects
            const projects = await strapi.entityService.findMany('api::project.project', {
              filters: {
                publishedAt: {
                  $null: false, // Only published projects
                },
              },
              sort: 'createdAt:desc',
              limit: 10,
            });

            if (projects && projects.length > 0) {
              const zohoEmailService = strapi.service('api::project.zoho-email');

              for (const project of projects) {
                try {
                  await zohoEmailService.onProjectCreated(project);
                } catch (error) {
                  strapi.log.error(`Failed to send notification for project ${project.id}:`, error);
                }
              }
            }
          } catch (error) {
            strapi.log.error('Error in project notification cron job:', error);
          }
        },
        options: {
          rule: '0 * * * *', // Run every hour at the top of the hour
        },
      },
    });

    // Setup blog scheduler cron job
    // Runs every minute to auto-publish blogs whose scheduled date/time has arrived
    strapi.cron.add({
      blogSchedulerCron: {
        task: async ({ strapi }) => {
          try {
            const now = new Date();

            const blogsToPublish = await strapi.entityService.findMany('api::blog.blog', {
              publicationState: 'preview',
              filters: {
                publishedAt: { $null: true },
                ScheduledAt: { $notNull: true, $lte: now },
              },
            });

            for (const blog of blogsToPublish) {
              try {
                await strapi.entityService.update('api::blog.blog', blog.id, {
                  data: { publishedAt: now },
                });
                strapi.log.info(`Auto-published scheduled blog #${blog.id} (${blog.Title})`);
              } catch (error) {
                strapi.log.error(`Failed to auto-publish blog ${blog.id}:`, error);
              }
            }
          } catch (error) {
            strapi.log.error('Error in blog scheduler cron job:', error);
          }
        },
        options: {
          rule: '* * * * *', // Run every minute
        },
      },
    });

    // Setup ayodhya-blog scheduler cron job
    // Runs every minute to auto-publish ayodhya blogs whose scheduled date/time has arrived
    strapi.cron.add({
      ayodhyaBlogSchedulerCron: {
        task: async ({ strapi }) => {
          try {
            const now = new Date();

            const blogsToPublish = await strapi.entityService.findMany('api::ayodhya-blog.ayodhya-blog', {
              publicationState: 'preview',
              filters: {
                publishedAt: { $null: true },
                ScheduledAt: { $notNull: true, $lte: now },
              },
            });

            for (const blog of blogsToPublish) {
              try {
                await strapi.entityService.update('api::ayodhya-blog.ayodhya-blog', blog.id, {
                  data: { publishedAt: now },
                });
                strapi.log.info(`Auto-published scheduled ayodhya blog #${blog.id} (${blog.Title})`);
              } catch (error) {
                strapi.log.error(`Failed to auto-publish ayodhya blog ${blog.id}:`, error);
              }
            }
          } catch (error) {
            strapi.log.error('Error in ayodhya-blog scheduler cron job:', error);
          }
        },
        options: {
          rule: '* * * * *', // Run every minute
        },
      },
    });
    // Setup scheduler cron jobs for content types with a ScheduledAt field
    // Runs every minute to auto-publish entries whose scheduled date/time has arrived
    const schedulerConfigs = [
      { name: 'realEstateNewsSchedulerCron', uid: 'api::real-estate-news.real-estate-news', label: 'real estate news' },
      { name: 'cityLocalLivingGuideSchedulerCron', uid: 'api::city-local-living-guide.city-local-living-guide', label: 'city local living guide' },
      { name: 'homeInteriorSchedulerCron', uid: 'api::home-interior.home-interior', label: 'home interior' },
      { name: 'legalDocumentationGuideSchedulerCron', uid: 'api::legal-documentation-guide.legal-documentation-guide', label: 'legal documentation guide' },
      { name: 'luxuryRealEstateSchedulerCron', uid: 'api::luxury-real-estate.luxury-real-estate', label: 'luxury real estate' },
      { name: 'realEstateVastuGuideSchedulerCron', uid: 'api::real-estate-vastu-guide.real-estate-vastu-guide', label: 'real estate vastu guide' },
    ];

    for (const { name, uid, label } of schedulerConfigs) {
      strapi.cron.add({
        [name]: {
          task: async ({ strapi }) => {
            try {
              const now = new Date();

              const entriesToPublish = await strapi.entityService.findMany(uid, {
                publicationState: 'preview',
                filters: {
                  publishedAt: { $null: true },
                  ScheduledAt: { $notNull: true, $lte: now },
                },
              });

              for (const entry of entriesToPublish) {
                try {
                  await strapi.entityService.update(uid, entry.id, {
                    data: { publishedAt: now },
                  });
                  strapi.log.info(`Auto-published scheduled ${label} #${entry.id} (${entry.Title})`);
                } catch (error) {
                  strapi.log.error(`Failed to auto-publish ${label} ${entry.id}:`, error);
                }
              }
            } catch (error) {
              strapi.log.error(`Error in ${label} scheduler cron job:`, error);
            }
          },
          options: {
            rule: '* * * * *', // Run every minute
          },
        },
      });
    }
  },
};

// Anuj

