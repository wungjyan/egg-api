'use strict';
const fs = require('fs');
module.exports = {
  schedule: {
    interval: '5m', // 5 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    const html = await ctx.service.weibo.requestHot();
    const data = await ctx.service.weibo.analyzeData(html.data);
    fs.writeFile('app/db/weibo.json', JSON.stringify(data), err => {
      if (err) {
        return console.error(err);
      }
      console.log('------更新微博热榜数据成功------');
    });
  },
};
