'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const cheerio = require('cheerio');

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
        data: '获取知乎数据失败',
        error: err,
      };
    }
  }
  // 请求知乎日报数据
  async requestDaily() {
    const { ctx, config } = this;
    const res = await ctx.curl(config.zhihuDaily, { dataType: 'text' });
    return res.data;
  }
  // 解析知乎日报数据
  async analyzeDaily(html) {
    const $ = cheerio.load(html);
    const dailyList = [];
    $('.col-lg-4 .wrap .box', '.main-content-wrap').each(function(index) {
      const $a = $(this).children('a');
      const link = 'https://daily.zhihu.com' + $a.attr('href');
      const img = $a.find('img').attr('src');
      const text = $a.find('span').text();
      dailyList.push({
        index,
        link,
        img,
        text,
      });
    });
    return dailyList;
  }
  // 读取知乎日报数据
  async getDaily() {
    try {
      const data = fs.readFileSync('app/db/zhihuDaily.json');
      return JSON.parse(data);
    } catch (err) {
      return {
        data: '获取知乎日报数据失败',
        error: err,
      };
    }
  }
}

module.exports = ZhihuService;
