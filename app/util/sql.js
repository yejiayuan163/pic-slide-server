'use strict';
module.exports = {
  // 新增相册
  async addSlideInfo(that, ctx) {
    const row = {
      TITLE: ctx.request.body.title,
      CREATE_DATE: new Date(),
      THUMB: ctx.request.body.picList[0].fileName,
      DESCRIPTION: ctx.request.body.description,
      TEMPLATE: ctx.request.body.template,
      MUSIC: ctx.request.body.music,
    };
    const result = await that.app.mysql.insert('SLIDE_LIST', row);
    console.log('插入slideInfo:', result);
    const updateSuccess = result.affectedRows === 1;
    const id = result.insertId;
    console.log('插入相册数据成功：', updateSuccess);
    return { updateSuccess, id };
  },
  // 关联照片
  async collectPicToSlide(that, ctx, relateSlideId) {
    // update by primary key ID, and refresh
    // const row = {
    //   PICTURE_ID: 40,
    //   RELATIVE_SLIDE_ID: relateSlideId,
    //   otherField: 'other field value',
    //   modifiedAt: that.app.mysql.literals.now, // `now()` on db server
    // };
    // const { picList } = ctx.request.body
    // const pictureId =
    console.log(ctx.request.body, 'pppppppppppppppppppppppp');
    const updatePictureIdArr = ctx.request.body.picList.map(item => {
      return item.pictureId;
    });
    console.log('updatePictureId', updatePictureIdArr);
    const result = await that.app.mysql.query(
      `UPDATE PICTURE_LIST SET RELATIVE_SLIDE_ID = ${relateSlideId} WHERE PICTURE_ID in (${updatePictureIdArr.join(
        ',')})`);
    return result.affectedRows === 1;
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
    return result.insertId;
  },
};
