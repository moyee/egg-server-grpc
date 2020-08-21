'use strict';
const Metadata = require('grpc').Metadata;

class BaseGrpc {
    constructor(call, agent) {
        this.call = call;
        this.agent = agent;
        this.metadata = new Metadata();
    }
}

module.exports = BaseGrpc;
