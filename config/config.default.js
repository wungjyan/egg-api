/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    // 知乎全站热榜
    zhihuApi: 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true',
    // 微博实时热搜
    weiboPage: 'https://s.weibo.com/top/summary?cate=realtimehot',
    // 知乎日报
    zhihuDaily: 'https://daily.zhihu.com/',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588573999425_446';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // 连接 mongodb
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/eggdb',
      options: {},
    },
  };

  // 安全验证
  config.security = {
    csrf: false,
  };

  // 表单验证
  config.validate = {
  };

  // jwt
  config.jwt = {
    secret: 'jwt12345',
  };

  config.env = 'dev';

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
