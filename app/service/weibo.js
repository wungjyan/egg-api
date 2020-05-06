'use strict';

const Service = require('egg').Service;
const cheerio = require('cheerio');
const fs = require('fs');

class WeiboService extends Service {
  async requestHot() {
    const { ctx, config } = this;
    const res = await ctx.curl(config.weiboPage, { dataType: 'text' });
    if (res.status !== 200) {
      return {
        data: '获取微博热门数据失败',
        error: res.status,
      };
    }
    return {
      data: res.data,
    };
  }
  // 解析html获取数据
  async analyzeData(html) {
    const $ = cheerio.load(html);
    const hotList = [];
    $('#pl_top_realtimehot table tbody tr').each(function(index) {
      const $td = $(this).children().eq(1);
      const link = 'https://s.weibo.com' + $td.find('a').attr('href');
      const text = $td.find('a').text();
      const hotValue = $td.find('span').text();
      const icon = $td.find('img').attr('src') ? 'https:' + $td.find('img').attr('src') : '';
      hotList.push({
        index,
        link,
        text,
        hotValue,
        icon,
      });
    });
    return hotList;
  }
  // 读取微博热榜数据
  async getHot() {
    try {
      const data = fs.readFileSync('app/db/weibo.json');
      return JSON.parse(data);
    } catch (err) {
      return {
        data: '获取知乎数据失败',
        error: err,
      };
    }
  }
}

module.exports = WeiboService;
