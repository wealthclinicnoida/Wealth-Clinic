'use strict';

/**
 * happy-customer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::happy-customer.happy-customer');
