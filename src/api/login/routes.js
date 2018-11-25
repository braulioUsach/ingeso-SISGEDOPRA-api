const router = require('koa-router')();
const Login = require('./index');

router
  .post('/', async ctx => {
    try {
      const user = ctx.request.body.user;
      const password = ctx.request.body.password;
      const login = new Login();
      ctx.status = 201;
      ctx.body = await login.create(user, password);
    } catch (err) {
      ctx.status = 404;
      ctx.body = {error: err.message};
    }
  })

module.exports = router.routes();
