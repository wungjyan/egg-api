'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  // jwt 验证中间件
  const jwt = middleware.jwt({ secret: app.config.jwt.secret });

  router.get('/', controller.home.index);
  // 爬虫接口
  router.get('/zhihu/hot', jwt, controller.zhihu.index);
  router.get('/weibo/hot', jwt, controller.weibo.index);
  router.get('/zhihu/daily', jwt, controller.zhihu.daily);
  // 用户接口
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
};
