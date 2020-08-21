# egg-server-grpc

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://github.com/surfaceyu/egg-server-grpc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-server-grpc
[travis-image]: https://github.com/surfaceyu/egg-server-grpc.svg?style=flat-square
[travis-url]: https://github.com/surfaceyu/egg-server-grpc
[codecov-image]: https://github.com/surfaceyu/egg-server-grpc.svg?style=flat-square
[codecov-url]: https://github.com/surfaceyu/egg-server-grpc?branch=master
[david-image]: https://github.com/surfaceyu/egg-server-grpc.svg?style=flat-square
[david-url]: https://github.com/surfaceyu/egg-server-grpc
[snyk-image]: https://github.com/surfaceyu/egg-server-grpc/badge.svg?style=flat-square
[snyk-url]: https://github.com/surfaceyu/egg-server-grpc
[download-image]: https://img.shields.io/npm/dm/egg-server-grpc.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-server-grpc

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-server-grpc 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

## 开启插件

```js
// config/plugin.js
exports.eggServerGrpc = {
  enable: true,
  package: 'egg-server-grpc',
};
```

## 使用场景

- Eggjs 中使用 grpc 服务器

- eggjs中 由于会启动多个worker，并会关闭worker以保持稳定，故 grpc服务端口放在 agent监听
通过 egg的sendtorandom和sendtoagent来通信

## Install
    npm i egg-server-grpc
## Example
    # app/proto/hello.proro
    syntax = "proto3";

    package hello;

    message Status {
    int32 code = 1;
    }

    service HelloService {
    rpc Echo(Status) returns (Status) {}
    }
    
    # app/service/hello.js
    'use strict';

    const Service = require('egg').Service;

    class HelloService extends Service {
    async Echo() {
        return { code: 400 };
    }
    }

    module.exports = HelloService;
    service目录中hello -> proto文件中的package
    app/service/hello.js中HelloService -> proto文件中的HelloService
    app/service/hello.js中HelloService中Echo方法 -> proto文件中的HelloService中 rpc Echo


## 详细配置

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。
    在配置文件中 增加 如下配置
    protoPath: 'app/proto', // 这里是proto文件的目录
    host: '0.0.0.0',        // 这里是监听地址
    port: '50055',          // 这里是监听端口

## 单元测试

<!-- 描述如何在单元测试中使用此插件，例如 schedule 如何触发。无则省略。-->

## 提问交流

请到 [egg issues](https://github.com/surfaceyu/egg-server-grpc/issues) 异步交流。

## License

[MIT](LICENSE)
