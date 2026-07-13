'use strict';

module.exports = () => ({
  async getHomepage() {
    return {
      success: true,
      message: 'Homepage API is working',
    };
  },
});
