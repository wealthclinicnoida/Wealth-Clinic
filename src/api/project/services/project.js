'use strict';

/**
 * project service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::project.project', ({ strapi }) => ({
  // Override create method to send email notification
  async create(params) {
    const result = await super.create(params);
    
    try {
      // Send email notification to all subscribers
      const zohoEmailService = strapi.service('api::project.zoho-email');
      await zohoEmailService.onProjectCreated(result);
    } catch (error) {
      strapi.log.warn('Failed to send project notification email:', error);
      // Don't fail the creation due to email error
    }
    
    return result;
  },

  // Optional: Override update method if you want to notify on updates too
  async update(id, params) {
    const result = await super.update(id, params);
    return result;
  },
}));
