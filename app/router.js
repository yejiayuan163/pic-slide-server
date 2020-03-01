'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/slide/list', controller.slide.list); // 相册广场列表
  router.get('/slide/details', controller.slide.details); // 相册详情
  router.get('/slide/videosDetails', controller.slide.videosDetails); // 视频详情
  router.post('/slide/edit', controller.slide.edit); // 编辑、新增相册
  router.post('/upload/pic', controller.upload.pic); // 上传图片
  router.post('/upload/audio', controller.upload.audio); // 上传音频
  router.post('/user/login', controller.user.login); // 登陆
};
