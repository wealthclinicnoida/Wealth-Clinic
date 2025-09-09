module.exports = (config, { strapi }) => {
  // Add your custom middleware logic here
  return async (ctx, next) => {
    // Set custom CORS headers if needed
    ctx.set("Access-Control-Allow-Origin", "https://wealth-clinic.com");
    ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    ctx.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // If preflight request, return early
    if (ctx.method === "OPTIONS") {
      ctx.status = 204;
      return;
    }

    // Continue to the next middleware
    await next();

    
    // ✅ Cache-Control only for uploads (media files)
    if (ctx.request.url.startsWith("/uploads/")) {
      ctx.set("Cache-Control", "public, max-age=31536000, immutable"); 
      // Cache for 1 year
    }

    
  };
};
