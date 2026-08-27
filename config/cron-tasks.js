"use strict";

const {
  publishScheduledContent,
} = require("../src/services/scheduled-publisher");

module.exports = {
  "* * * * *": async ({ strapi }) => {
    await publishScheduledContent(strapi);
  },
};
