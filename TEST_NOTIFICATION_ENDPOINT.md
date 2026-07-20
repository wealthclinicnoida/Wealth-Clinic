// Quick API Endpoint to Manually Test Email Notification
// Add this to src/api/project/controllers/project.js if you want to test

// OPTIONAL: Add this method to your project controller for manual testing
// async sendTestNotification(ctx) {
//   try {
//     const { id } = ctx.params;
//     const project = await strapi.service('api::project.project').findOne(id);
//     
//     if (!project) {
//       return ctx.notFound();
//     }
//     
//     const zohoEmailService = strapi.service('api::project.zoho-email');
//     await zohoEmailService.onProjectCreated(project);
//     
//     ctx.send({
//       message: 'Email notification sent successfully',
//       project: project.id,
//     });
//   } catch (error) {
//     ctx.throw(500, error.message);
//   }
// }

// Add to src/api/project/routes/project.js:
// {
//   method: 'POST',
//   path: '/projects/:id/send-notification',
//   handler: 'project.sendTestNotification',
//   config: { auth: false } // Adjust auth as needed
// }

// Then POST to: http://localhost:1337/api/projects/1/send-notification
