const router = require('koa-router')();
const Health = require('./index');

router
  .get('/', (ctx) => {
    ctx.status = 200;
    ctx.body = Health.getStatus();
  });

module.exports = router.routes();
