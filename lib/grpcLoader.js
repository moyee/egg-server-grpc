'use strict';

const GrpcCore = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const fs = require('fs');
const grpcService = require('./grpcService');

module.exports = async agent => {
  const config = agent.config.grpcServer;
  const protoPath = config.protoPath;

  // 创建server
  agent.grpcServer = new GrpcCore.Server();
  await getAllServices(path.join(agent.config.baseDir, protoPath), agent, config);
  agent.grpcServer.bind(`${config.host}:${config.port}`, GrpcCore.ServerCredentials.createInsecure());
  agent.ready(() => {
    agent.grpcServer.start();
    agent.logger.info('[egg-grpc-server] grpc start on port:' + config.port);
  });
};

async function getAllServices(protoPath, agent, config) {
  if (!fs.existsSync(protoPath)) {
    throw new Error('no proto file');
  }
  const protoFileList = fs.readdirSync(protoPath);
  for (const protoName of protoFileList) {
    const protoFilePath = path.join(protoPath, protoName);
    const stats = fs.statSync(protoFilePath);
    if (stats.isFile() && path.extname(protoName) === '.proto') {
      const protoObj = await protoLoader.load(protoFilePath, config.loaderOption || {});
      for (const rpcpackage in protoObj) {
        const protoServer = protoObj[rpcpackage];
        if (protoServer.type) continue;
        const service = buildService(protoServer, agent);
        agent.coreLogger.debug(`[egg-grpc-server] ${rpcpackage} init`);
        agent.grpcServer.addService(protoServer, service);
      }
    }
  }
}

function buildService(protoServer, agent) {
  const service = {};
  for (const p in protoServer) {
    service[p] = (call, callback) => {
      if (!protoServer[p] || !protoServer[p].path) {
        callback(new Error('not implement no path'));
        return;
      }
      const ps = protoServer[p].path.split('/');
      if (!ps || ps.length === 0) {
        callback(new Error('not implement invaild path'));
        return;
      }
      const svrPath = ps[1].split('.');
      if (!svrPath || svrPath.length === 0) {
        callback(new Error('not implement invaild service'));
        return;
      }
      call.request.pkg = svrPath[0];
      call.request.service = svrPath[1];
      call.request.func = ps[2];
      const handler = new grpcService(call, agent);
      handler.Send()
        .then(data => {
          callback(null, data);
        })
        .catch(error => {
          callback(error);
        });
      return;
    };
  }
  return service;
}
