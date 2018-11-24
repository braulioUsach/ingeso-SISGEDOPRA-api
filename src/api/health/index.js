'use strict';

const INFO = require('../../../package.json');

class Health {
  getStatus() {
    return {
      'application': INFO.name,
      'uptime': process.uptime(),
      'memory': process.memoryUsage(),
      'node-version': process.version
    };
  };
}

module.exports = Health;
