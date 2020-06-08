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
  router.get('/zhihu/hot', controller.zhihu.index);
  router.get('/weibo/hot', controller.weibo.index);
  router.get('/zhihu/daily', controller.zhihu.daily);
  // 用户接口
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.get('/user/info', jwt, controller.user.getInfo);
  router.post('/user/logout', controller.user.logout);
};
