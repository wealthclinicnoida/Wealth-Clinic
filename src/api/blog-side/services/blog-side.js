'use strict';

/**
 * blog-side service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::blog-side.blog-side');
