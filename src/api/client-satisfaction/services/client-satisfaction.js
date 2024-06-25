'use strict';

/**
 * client-satisfaction service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::client-satisfaction.client-satisfaction');
