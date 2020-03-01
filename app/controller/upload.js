'use strict';
const addPicToStatic = require('../util/upload').addPicToStatic;
const addPictureInfo = require('../util/sql').addPictureInfo;


const Controller = require('egg').Controller;

class UploadController extends Controller {
  async pic() {
    const { ctx } = this;
    const fileName = await addPicToStatic(this, ctx);
    console.log('fileName:', fileName)
    addPictureInfo(this, fileName)
    ctx.set('Content-Type', 'multipart/*');
    ctx.body = { code: '000000', info: { fileName } };
    ctx.status = 200;
  }

  async audio() {
    const { ctx } = this;
    ctx.body = 'hi, audio';
  }
}

module.exports = UploadController;
