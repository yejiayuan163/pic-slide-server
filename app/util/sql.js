'use strict';
module.exports = {
  // 新增相册
  async addSlideInfo(that, ctx) {
    const row = {
      TITLE: ctx.request.body.title,
      CREATE_DATE: new Date(),
      THUMB: ctx.request.body.data[0].fileName,
      DESCRIPTION: ctx.request.body.description,
      TEMPLATE: ctx.request.body.template,
      MUSIC: ctx.request.body.music,
    };
    const result = await that.app.mysql.insert('SLIDE_LIST', row);
    const updateSuccess = result.affectedRows === 1;
    console.log('插入相册数据成功：', updateSuccess);
    return updateSuccess;
  },
  // 查询相册基本信息
  async getSlideInfo(that, ctx) {
    const slideInfo = await that.app.mysql.select('SLIDE_LIST',
      { where: { ID: ctx.query.id } });
    return slideInfo[0];
  },
  // 查询相册图片信息
  async getPicList(that, ctx) {
    const picList = await that.app.mysql.select('PICTURE_LIST',
      { where: { RELATIVE_SLIDE_ID: ctx.query.id } });
    const result = picList.map((item, index) => {
      return `/image/${item.PICTURE_SRC}`;
    });
    // console.log('pictureList:', result)
    return result;
  },
  // 查询视频基本信息
  async getVideoInfo(that, ctx) {
    const videoInfo = await that.app.mysql.select('VIDEO_LIST',
      { where: { RELATIVE_SLIDE_ID: ctx.query.id } });
    return videoInfo[0];
  },
  // 保存图片记录到数据库
  async addPictureInfo(that, fileName) {
    const row = {
      PICTURE_SRC: fileName,
    };
    const result = await that.app.mysql.insert('PICTURE_LIST', row);
    const updateSuccess = result.affectedRows === 1;
    console.log('插入图片数据成功：', updateSuccess);
  },
};
