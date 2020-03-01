/* eslint valid-jsdoc: "off" */

'use strict';
const mysqlConfig = require('../mysql.config')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582729977399_1898';

  // add your middleware config here
  config.middleware = [ 'corssOrigin' ];

  // mysql配置文件
  config.mysql = mysqlConfig;


  //跨域配置
  config.security = {
    csrf: {
      enable: false, // 前后端分离，post请求不方便携带_csrf
      ignoreJSON: true,
    },
    // domainWhiteList: ['http://www.baidu.com', 'http://localhost:8080'], //配置白名单
  };

  config.cors = {
    origin: '*', //允许所有跨域访问，注释掉则允许上面 白名单 访问
    credentials: true, // 允许跨域请求携带cookies
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
