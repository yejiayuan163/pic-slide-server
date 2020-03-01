// app/service/user.js
const Service = require('egg').Service;
const getSlideInfo = require('../util/sql').getSlideInfo;
const getPicList = require('../util/sql').getPicList;
const getVideoInfo = require('../util/sql').getVideoInfo;
const addSlideInfo = require('../util/sql').addSlideInfo;

class SlideService extends Service {
  async getList(ctx) {
    // const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    const result = await this.app.mysql.select('SLIDE_LIST', { limit: 10 });
    // console.log('result:', result);
    let picList = result.map((item) => {
      return {
        title: item.TITLE,
        createDate: item.CREATE_DATE,
        desc: item.DESCRIPTION,
        template: item.TEMPLATE,
        id: item.ID,
        thumb: `image/${item.THUMB}`,
      };
    });
    return {
      code: '000000', info: {
        picList,
      },
    };
  }

  async slideDetails(ctx) {
    const result = await Promise.all(
      [ getSlideInfo(this, ctx), getPicList(this, ctx) ]);
    const slideInfo = result[0];
    const picList = result[1];
    // console.log(slideInfo, picList, '000000');
    return {
      code: '000000',
      info: {
        collectionInfo: {
          title: slideInfo.TITLE,
          musicUrl: `/audio/${slideInfo.MUSIC}`,
          picList,
        },
      },
    };
    // const slideInfo = await getSlideInfo(this, ctx);
    // const picList = await getPicList(this, ctx);
    // console.log('ctx:', ctx.query, music, 'lllllllll', picList);
  }

  async videosDetails(ctx) {
    const videoInfo = await getVideoInfo(this, ctx);
    // console.log(videoInfo, '000000');
    return {
      code: '000000',
      info: {
        videoInfo: {
          videoSrc: `/video/${videoInfo.VIDEO_SRC}`,
        },
      },
    };
  }

  async addSlideInfo(ctx) {
    console.log('编辑：', ctx.request.body);
    const data = ctx.request.body;
    if (data.id) {
      // 修改相册
    } else {
      // 新增相册
      return await addSlideInfo(this, ctx);
    }
  }
}

module.exports = SlideService;
