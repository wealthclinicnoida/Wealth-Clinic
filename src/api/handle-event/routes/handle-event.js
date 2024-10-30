'use strict';

/**
 * handle-event router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::handle-event.handle-event');
