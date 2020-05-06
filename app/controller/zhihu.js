'use strict';

const Controller = require('egg').Controller;

class ZhihuController extends Controller {
  async index() {
    const data = await this.ctx.service.zhihu.getHot();
    this.ctx.body = data;
  }
}

module.exports = ZhihuController;
