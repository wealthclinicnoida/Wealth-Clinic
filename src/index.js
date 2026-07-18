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
            const projects = await strapi.service('api::project.project').find({
              filters: {
                publishedAt: {
                  $null: false, // Only published projects
                },
              },
              sort: 'createdAt:desc',
              limit: 10,
            });

            if (projects && projects.data.length > 0) {
              const zohoEmailService = strapi.service('api::project.zoho-email');
              
              for (const project of projects.data) {
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
  },
};

// Anuj

