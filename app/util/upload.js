'use strict';
const fs = require('fs')
const path = require('path')
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
module.exports = {
  // 添加图片到静态资源库
  async addPicToStatic(that, ctx) {
    const stream = await ctx.getFileStream();
    const filename = `p${new Date().getTime()}.${stream.filename.split('.')[1]}`;
    console.log(filename);
    //  上传基础目录
    const uplaodBasePath = '../../../picSlideStatic/image';
    // 生成文件夹
    const dirName = '';
    const dir = path.join(__dirname, uplaodBasePath, dirName);
    const dirImg = path.join(__dirname, uplaodBasePath, dirName, filename);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    if (fs.existsSync(dirImg)) {
      // that.operationLogger(request, '图片上传', false);
      ctx.body = { msg: '此图片名已存在' };
      ctx.status = 400;
      return;
    }
    // const res = fs.readdirSync(dir);
    // if (res.length > 2) {
    //   ctx.body = { msg: '最多只能传三张图片' };
    //   ctx.status = 400;
    //   return;
    // }
    const target = path.join(__dirname, uplaodBasePath, dirName, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 写入文件
      await awaitWriteStream(stream.pipe(writeStream));
      // that.operationLogger(request, '图片上传', true);
      console.log('图片上传成功！')
      return filename;
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      console.log('图片上传失败！')
      await sendToWormhole(stream);
      // this.operationLogger(request, '图片上传', false);
      ctx.body = { msg: '写入图片失败' };
      ctx.status = 400;
      throw err;
    }
  },
}
