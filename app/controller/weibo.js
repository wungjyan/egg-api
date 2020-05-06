'use strict';

const Controller = require('egg').Controller;

class WeiboController extends Controller {
  async index() {
    const data = await this.ctx.service.weibo.getHot();
    this.ctx.body = data;
  }
}

module.exports = WeiboController;
