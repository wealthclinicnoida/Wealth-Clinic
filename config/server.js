"use strict";

const cronTasks = require("./cron-tasks");

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),

  app: {
    keys: env.array("APP_KEYS"),
  },

  cron: {
    enabled: true,
    tasks: require("./cron-tasks"),
  },

  webhooks: {
    populateRelations: env.bool(
      "WEBHOOKS_POPULATE_RELATIONS",
      false
    ),
  },

  email: {
    gmail: {
      user: env("GMAIL_USER"),
      appPassword: env("GMAIL_APP_PASSWORD"),
    },
    recipientList: [],
  },
});
