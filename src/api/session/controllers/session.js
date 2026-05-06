"use strict";

const SESSION_UID = "api::session.session";

// =====================================
// HELPERS
// =====================================

async function findSession(sessionId) {
  const sessions = await strapi.entityService.findMany(SESSION_UID, {
    filters: { sessionId },
    limit: 1,
  });

  return sessions?.[0] || null;
}

async function updateSession(id, data) {
  return await strapi.entityService.update(SESSION_UID, id, {
    data,
  });
}

// =====================================
// CONTROLLER
// =====================================

module.exports = {

  // =====================================
  // CREATE / UPSERT SESSION
  // =====================================

  async upsert(ctx) {
    try {
      const { sessionId, email, playerId } = ctx.request.body;

      if (!sessionId) {
        return ctx.badRequest("sessionId required");
      }

      const now = new Date();

      let session = await findSession(sessionId);

      if (session) {
        session = await updateSession(session.id, {
          email,
          playerId,
          lastActiveAt: now,
          isActive: true,
        });
      } else {
        session = await strapi.entityService.create(SESSION_UID, {
          data: {
            sessionId,
            email,
            playerId,
            lastActiveAt: now,
            isActive: true,
            wishlist: [],
            lastViewed: [],
            lastSearched: [],
          },
        });
      }

      return ctx.send({
        success: true,
        data: session,
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

  // =====================================
  // GET SESSION
  // =====================================

  async get(ctx) {
    try {
      const { sessionId } = ctx.params;

      const session = await findSession(sessionId);

      if (!session) {
        return ctx.notFound("Session not found");
      }

      return ctx.send({
        success: true,
        data: session,
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

  // =====================================
  // UPDATE SESSION
  // =====================================

  async update(ctx) {
    try {
      const { sessionId } = ctx.params;

      const session = await findSession(sessionId);

      if (!session) {
        return ctx.notFound("Session not found");
      }

      const updated = await updateSession(
        session.id,
        ctx.request.body
      );

      return ctx.send({
        success: true,
        data: updated,
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

  // =====================================
  // DELETE SESSION
  // =====================================

  async delete(ctx) {
    try {
      const { sessionId } = ctx.params;

      const session = await findSession(sessionId);

      if (!session) {
        return ctx.notFound("Session not found");
      }

      await strapi.entityService.delete(
        SESSION_UID,
        session.id
      );

      return ctx.send({
        success: true,
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

  // =====================================
  // WISHLIST
  // =====================================

  async addWishlist(ctx) {
    try {

      const {
        sessionId,
        propertyId,
        propertyName,
        price,
        slug,
      } = ctx.request.body;

      let session = await findSession(sessionId);

      if (!session) {
        return ctx.notFound("Session not found");
      }

      let wishlist = session.wishlist || [];

      wishlist = wishlist.filter(
        item => item.propertyId !== propertyId
      );

      wishlist.unshift({
        propertyId,
        propertyName,
        price,
        slug,
        addedAt: new Date(),
      });

      wishlist = wishlist.slice(0, 100);

      const updated = await updateSession(session.id, {
        wishlist,
      });

      return ctx.send({
        success: true,
        wishlist: updated.wishlist,
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

  async getWishlist(ctx) {
    try {

      const { sessionId } = ctx.params;

      const session = await findSession(sessionId);

      return ctx.send({
        success: true,
        wishlist: session?.wishlist || [],
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

  async removeWishlist(ctx) {
    try {

      const { sessionId, propertyId } = ctx.request.body;

      let session = await findSession(sessionId);

      if (!session) {
        return ctx.notFound("Session not found");
      }

      const wishlist = (session.wishlist || []).filter(
        item => item.propertyId !== propertyId
      );

      await updateSession(session.id, {
        wishlist,
      });

      return ctx.send({
        success: true,
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

  // =====================================
  // LAST VIEWED
  // =====================================

  async addViewed(ctx) {
    try {

      const {
        sessionId,
        propertyId,
        propertyName,
        price,
        slug,
      } = ctx.request.body;

      let session = await findSession(sessionId);

      if (!session) {
        return ctx.notFound("Session not found");
      }

      let viewed = session.lastViewed || [];

      viewed = viewed.filter(
        item => item.propertyId !== propertyId
      );

      viewed.unshift({
        propertyId,
        propertyName,
        price,
        slug,
        viewedAt: new Date(),
      });

      viewed = viewed.slice(0, 20);

      const updated = await updateSession(session.id, {
        lastViewed: viewed,
      });

      return ctx.send({
        success: true,
        viewed: updated.lastViewed,
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

  async getViewed(ctx) {
    try {

      const { sessionId } = ctx.params;

      const session = await findSession(sessionId);

      return ctx.send({
        success: true,
        viewed: session?.lastViewed || [],
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

  async clearViewed(ctx) {
    try {

      const { sessionId } = ctx.request.body;

      let session = await findSession(sessionId);

      if (!session) {
        return ctx.notFound("Session not found");
      }

      await updateSession(session.id, {
        lastViewed: [],
      });

      return ctx.send({
        success: true,
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

  // =====================================
  // LAST SEARCHED
  // =====================================

  async addSearch(ctx) {
    try {

      const {
        sessionId,
        searchQuery,
        city,
        type,
      } = ctx.request.body;

      let session = await findSession(sessionId);

      if (!session) {
        return ctx.notFound("Session not found");
      }

      let searched = session.lastSearched || [];

      searched = searched.filter(
        item => item.searchQuery !== searchQuery
      );

      searched.unshift({
        searchQuery,
        city,
        type,
        searchedAt: new Date(),
      });

      searched = searched.slice(0, 20);

      const updated = await updateSession(session.id, {
        lastSearched: searched,
      });

      return ctx.send({
        success: true,
        searched: updated.lastSearched,
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

  async getSearch(ctx) {
    try {

      const { sessionId } = ctx.params;

      const session = await findSession(sessionId);

      return ctx.send({
        success: true,
        searched: session?.lastSearched || [],
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

  async clearSearch(ctx) {
    try {

      const { sessionId } = ctx.request.body;

      let session = await findSession(sessionId);

      if (!session) {
        return ctx.notFound("Session not found");
      }

      await updateSession(session.id, {
        lastSearched: [],
      });

      return ctx.send({
        success: true,
      });

    } catch (err) {
      return ctx.badRequest(err.message);
    }
  },

};
