module.exports = options => {
  return async function setCrossOrigin(ctx, next) {
    // const { origin } = ctx.request.header;
    // console.log('ctx', ctx);
    // ctx.set('Access-Control-Allow-Origin', origin);
    await next();
  };
};
