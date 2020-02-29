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

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
