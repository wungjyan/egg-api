'use strict';

const Controller = require('egg').Controller;
const jsonwebtoken = require('jsonwebtoken');
class UserController extends Controller {
  async register() {
    try {
      this.ctx.validate({ nickName: 'string', password: 'string' });
      const { nickName, password } = this.ctx.request.body;
      const repeateUser = await this.ctx.model.User.findOne({ nickName });
      if (repeateUser) {
        this.ctx.body = { success: false, error: '用户已经存在！' };
      } else {
        const res = await this.ctx.model.User.create({
          nickName, password,
        });
        this.ctx.body = { success: true, data: { nickName: res.nickName } };
      }
    } catch (err) {
      this.ctx.body = { success: false, error: err };
    }
  }

  async login() {
    try {
      this.ctx.validate({ nickName: 'string', password: 'string' });
      const user = await this.ctx.model.User.findOne(this.ctx.request.body);
      if (!user) {
        this.ctx.body = { success: false, error: '用户不存在' };
      } else {
        const { _id, nickName } = user;
        const token = jsonwebtoken.sign({ _id, nickName }, this.config.jwt.secret, { expiresIn: '7d' });
        this.ctx.body = { data: { nickName, token } };
      }
    } catch (err) {
      this.ctx.body = { success: false, error: err };
    }
  }
}

module.exports = UserController;
