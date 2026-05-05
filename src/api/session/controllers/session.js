'use strict';

module.exports = {
  async upsertSession(ctx) {
    try {
      const { sessionId, email, playerId } = ctx.request.body;

      if (!sessionId) {
        return ctx.badRequest('sessionId is required');
      }

      const now = new Date();

      // Check if session exists
      const existing = await strapi.entityService.findMany(
        'api::session.session',
        {
          filters: { sessionId },
          limit: 1
        }
      );

      let session;

      if (existing.length > 0) {
        // Update
        session = await strapi.entityService.update(
          'api::session.session',
          existing[0].id,
          {
            data: {
              email,
              playerId,
              lastActiveAt: now,
              isActive: true
            }
          }
        );
      } else {
        // Create
        session = await strapi.entityService.create(
          'api::session.session',
          {
            data: {
              sessionId,
              email,
              playerId,
              lastActiveAt: now,
              isActive: true
            }
          }
        );
      }

      ctx.send({
        success: true,
        data: session
      });

    } catch (err) {
      ctx.throw(500, err);
    }
  }
};