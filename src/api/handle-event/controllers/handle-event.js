'use strict';

/**
 * handle-event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::handle-event.handle-event');
