'use strict';

const grpcLoader = require('./lib/grpcLoader');

class AgentBootHook {
  constructor(agent) {
    this.agent = agent;
  }

  async serverDidReady() {
    const agent = this.agent;
    await grpcLoader(agent);
  }
}

module.exports = AgentBootHook;
