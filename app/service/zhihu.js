'use strict';

const Service = require('egg').Service;
const fs = require('fs');
class ZhihuService extends Service {
  // 请求知乎热榜数据
  async requestHot() {
    const { ctx, config } = this;
    const res = await ctx.curl(config.zhihuApi, { dataType: 'json' });
    return res.data.data;
  }
  // 读取知乎热榜数据
  async getHot() {
    try {
      const data = fs.readFileSync('app/db/zhihu.json');
      return JSON.parse(data);
    } catch (err) {
      return {
        msg: '获取知乎数据失败',
        error: err,
      };
    }
  }
}

module.exports = ZhihuService;
