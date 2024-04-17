'use strict';

/**
 * create-state service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::create-state.create-state');
