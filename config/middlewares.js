module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "https://wealth-clinic.com",
        "http://localhost:3000",
        "http://localhost:1337/",
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      expose: ["WWW-Authenticate", "Server-Authorization"],
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
      maxAge: 31536000, // ✅ Cache for 1 year
      immutable: true,  // ✅ Browser won’t revalidate unless file URL changes
    },
  },
  {
    name: "global::customCors", // Keep your custom middleware if needed
    config: {
      // Optional custom config
    },
  },
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
