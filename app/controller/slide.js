'use strict';

const Controller = require('egg').Controller;

class SlideController extends Controller {
  async list() {
    const { ctx } = this;
    const list = await ctx.service.slide.getList(ctx);
    ctx.status = 200;
    ctx.body = list;
    // ctx.body = 'hi, details';
  }

  async details() {
    const { ctx } = this;
    const slideDetails = await ctx.service.slide.slideDetails(ctx);
    ctx.body = slideDetails;
  }

  async videosDetails() {
    const { ctx } = this;
    const videosDetails = await ctx.service.slide.videosDetails(ctx);
    ctx.body = videosDetails;
  }

  async edit() {
    const { ctx } = this;
    const result = await ctx.service.slide.addSlideInfo(ctx);
    console.log('resut:', result);
    if (result) {
      ctx.body = { code: '000000', msg: '保存成功' };
    } else {
      ctx.body = { code: '111111', msg: '出问题了' };
    }
    ctx.status = 200;
  }
}

module.exports = SlideController;
