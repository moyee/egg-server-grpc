'use strict';

const mock = require('egg-mock');

describe('test/egg-server-grpc.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/egg-server-grpc-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, eggServerGrpc')
      .expect(200);
  });
});
