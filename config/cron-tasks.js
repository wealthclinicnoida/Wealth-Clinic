"use strict";

const {
  publishScheduledContent,
} = require("../src/services/scheduled-publisher");

module.exports = {
  "0 */12 * * *": async ({ strapi }) => {
    await publishScheduledContent(strapi);
  },
};
