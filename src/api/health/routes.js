const router = require('koa-router')();
const Health = require('./index');

router
  .get('/', ctx => {
    const health = new Health();
    ctx.status = 200;
    ctx.body = health.getStatus();
  })

module.exports = router.routes();
