'use strict';

/**
 * builder service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::builder.builder');
