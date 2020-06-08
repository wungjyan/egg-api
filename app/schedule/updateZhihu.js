'use strict';
const fs = require('fs');
module.exports = {
  schedule: {
    interval: '5m', // 5 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
    immediate: true,
  },
  async task(ctx) {
    const hot = await ctx.service.zhihu.requestHot();
    const data = await ctx.service.zhihu.filterHotData(hot);
    fs.writeFile('app/db/zhihu.json', JSON.stringify(data), err => {
      if (err) {
        return console.error(err);
      }
      console.log('------更新知乎热榜数据成功------');
    });
  },
}
;
