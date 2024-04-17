'use strict';

/**
 * create-city controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::create-city.create-city');
