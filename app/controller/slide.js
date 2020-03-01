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
    ctx.body = result;
  }
}

module.exports = SlideController;
