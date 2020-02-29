// app/service/user.js
const Service = require('egg').Service;

class SlideService extends Service {
  async getList(uid) {
    // const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    const result = await this.app.mysql.select('SLIDE_LIST', { limit: 10 });
    console.log('result:', result);
    let picList = result.map((item, index) => {
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
        picList
      }
    };
  }

  async slideDetails(uid) {
    // const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    return {
      code: '000000', info: {
        collectionInfo: {
          title: '妈妈相册12',
          musicUrl: 'audio/456.mp3',
          picList: [
            'image/2.jpg',
            'image/3.jpg',
            'image/4.jpg',
            'image/5.jpg',
          ]
        }
      }
    };
  }
}

module.exports = SlideService;
