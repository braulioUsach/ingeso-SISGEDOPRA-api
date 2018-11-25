const router = require('koa-router')();
const _ = require('lodash');
const User = require('./index');

router
  .get('/ping', async ctx => {
    try {
      const user = new User();
      ctx.status = 200;
      ctx.body = await user.ping();
    } catch (err) {
      ctx.status = 404;
      ctx.body = {
        error: err.message
      };
    }
  })
module.exports = router.routes();