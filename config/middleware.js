module.exports = ({ env }) => ({
  settings: {
    cors: {
      enabled: true,
      origin: ["https://wealth-clinic.com", "http://localhost:3000"],
    },
  },
});
