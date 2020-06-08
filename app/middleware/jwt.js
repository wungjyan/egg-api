'use strict';

const jsonwebtoken = require('jsonwebtoken');
module.exports = options => {
  return async function(ctx, next) {
    try {
      const { authorization = '' } = ctx.request.header;
      if (!authorization) {
        ctx.throw(401, '没有权限调用');
      }
      const token = authorization.replace('Bearer ', '');
      const user = jsonwebtoken.verify(token, options.secret);
      ctx.state.user = user; // 将获取的信息传入 ctx
    } catch (error) {
      ctx.throw(500, error);
    }
    await next();
  };
}
;
