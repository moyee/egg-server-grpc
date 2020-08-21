'use strict';

const Service = require('egg').Service;

class HelloService extends Service {
  async Echo() {
    return { code: 400 };
  }
}

module.exports = HelloService;
