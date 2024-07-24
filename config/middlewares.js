module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

// module.exports = [
//   "strapi::logger",
//   "strapi::errors",
//   "strapi::security",
//   // "strapi::cors",
//   {
//     name: "strapi::cors",
//     config: {
//       enabled: true,
//       origin: [
//         "https://wealth-clinic.com",
//         "http://localhost:3000",
//         "http://localhost:1337/",
//       ], // Allowed domains
//       methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//       headers: ["Content-Type", "Authorization", "Origin", "Accept"],
//       expose: ["WWW-Authenticate", "Server-Authorization"],
//       credentials: true,
//     },
//   },
//   "strapi::poweredBy",
//   "strapi::query",
//   "strapi::body",
//   "strapi::session",
//   "strapi::favicon",
//   "strapi::public",
//   {
//     name: "global::customCors", // Load your custom middleware
//     config: {
//       // Additional config if needed
//     },
//   },
// ];
