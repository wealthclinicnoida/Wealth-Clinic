"use strict";

const cronTasks = require("./cron-tasks");

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),

  app: {
    keys: env.array("APP_KEYS"),
  },

  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },

  // Enable Strapi cron jobs
  cron: {
    enabled: true,
    tasks: cronTasks,
  },

  // Gmail Email Configuration
  email: {
    gmail: {
      user: env("GMAIL_USER"),
      appPassword: env("GMAIL_APP_PASSWORD"),
    },

    recipientList: [
      // Add recipient emails here
      // { email: "recipient@example.com", name: "Recipient Name" }
    ],
  },
});
