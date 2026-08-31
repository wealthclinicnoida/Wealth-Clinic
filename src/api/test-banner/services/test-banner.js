'use strict';

/**
 * test-banner service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::test-banner.test-banner');
