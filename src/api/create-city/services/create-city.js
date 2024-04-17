'use strict';

/**
 * create-city service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::create-city.create-city');
