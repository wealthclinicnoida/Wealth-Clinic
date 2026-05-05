'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/session/upsert',
      handler: 'session.upsertSession',
      config: {
        auth: false
      }
    }
  ]
};