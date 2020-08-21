'use strict';

// const grpcLoader = require('./app/lib/grpcLoader')

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didReady() {
    const app = this.app;
    const ctx = await app.createAnonymousContext();
    app.messenger.on('GRPC_SERVICE', async msg => {
      try {
        if (ctx.service[msg.pkg] && ctx.service[msg.pkg][msg.func]) {
          const result = await ctx.service[msg.pkg][msg.func](msg);
          return app.messenger.sendToAgent(msg.uuid, result);
        }
        throw ('ctx.service %s.%s->%s not found', msg.pkg, msg.service, msg.func);

      } catch (error) {
        app.logger.error('[GRPC_SERVICE] msg: %j error %j', msg, error);
      }
      return app.messenger.sendToAgent(msg.uuid, null);
    });
  }
}

module.exports = AppBootHook;
