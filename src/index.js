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
  },
};

// Anuj

