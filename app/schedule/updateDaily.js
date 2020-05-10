'use strict';
const fs = require('fs');
module.exports = {
  schedule: {
    interval: '12h', // 5 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
    immediate: true,
  },
  async task(ctx) {
    const html = await ctx.service.zhihu.requestDaily();
    const data = await ctx.service.zhihu.analyzeDaily(html);
    fs.writeFile('app/db/zhihuDaily.json', JSON.stringify(data), err => {
      if (err) {
        return console.error(err);
      }
      console.log('------更新知乎日报数据成功------');
    });
  },
}
;
