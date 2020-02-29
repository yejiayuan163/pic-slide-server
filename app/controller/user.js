'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.body = 'hi, login';
  }
}

module.exports = UserController;
