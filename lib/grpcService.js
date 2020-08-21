'use strict';

const uuid = require('uuid');

const BaseGrpc = require('./baseGrpc');

class SendService extends BaseGrpc {
  async Send() {
    const self = this;
    function returnPromise() {
      self.call.request.uuid = uuid.v1();
      self.agent.messenger.sendRandom('GRPC_SERVICE', self.call.request);
      return new Promise(resolve => {
        self.agent.messenger.once(self.call.request.uuid, msg => {
          resolve(msg);
        });
      });
    }
    const result = await returnPromise();
    return result;
  }
}

module.exports = SendService;
