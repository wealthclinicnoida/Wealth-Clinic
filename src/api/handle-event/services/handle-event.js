'use strict';

/**
 * handle-event service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::handle-event.handle-event');
