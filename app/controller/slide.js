'use strict';

const Controller = require('egg').Controller;

class SlideController extends Controller {
  async list() {
    const { ctx } = this;
    const list = await ctx.service.slide.getList();
    ctx.status = 200;
    ctx.body = list;
    // ctx.body = 'hi, details';
  }

  async details() {
    const { ctx } = this;
    const slideDetails = await ctx.service.slide.slideDetails();
    ctx.body = slideDetails;
  }

  async edit() {
    const { ctx } = this;
    ctx.body = 'hi, edit';
  }
}

module.exports = SlideController;
