'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async pic() {
    const { ctx } = this;
    ctx.body = 'hi, pic';
  }
  async audio() {
    const { ctx } = this;
    ctx.body = 'hi, audio';
  }
}

module.exports = UploadController;
