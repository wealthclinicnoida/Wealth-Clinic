module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: ["*"], // ✅ Allow all origins
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  {
    name: "strapi::public",
    config: {
      maxAge: 31536000, // 1 year
      immutable: true,
    },
  },
];



// module.exports = [
//   "strapi::logger",
//   "strapi::errors",
//   "strapi::security",
//   "strapi::cors",
//   "strapi::poweredBy",
//   "strapi::query",
//   "strapi::body",
//   "strapi::session",
//   "strapi::favicon",
//    {
//     name: 'strapi::public',
//     config: {
//       maxAge: 31536000, // 1 year
//       immutable: true,
//     },
//   },
// ];

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
