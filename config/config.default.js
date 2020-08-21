'use strict';

/**
 * egg-server-grpc default config
 * @member Config#grpcServer
 * @property {String} SOME_KEY - some description
 */
exports.grpcServer = {
  protoPath: 'app/proto', //* .proto path
  host: '0.0.0.0',
  port: '50055',
  loaderOption: {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
};
