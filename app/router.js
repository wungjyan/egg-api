'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/zhihu/hot', controller.zhihu.index);
  router.get('/weibo/hot', controller.weibo.index);
  router.get('/zhihu/daily', controller.zhihu.daily);
};
