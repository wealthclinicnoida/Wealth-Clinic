module.exports = ({ env }) => ({
  // console.log("APP_KEYS:", env.array("APP_KEYS"))
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },

  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },

  // Gmail Email Configuration
  email: {
    gmail: {
      user: env("GMAIL_USER"),
      appPassword: env("GMAIL_APP_PASSWORD"),
    },
    recipientList: [
      // Add recipient emails here or use RECIPIENT_EMAILS env variable
      // { email: 'recipient@example.com', name: 'Recipient Name' }
    ],
  },
});
