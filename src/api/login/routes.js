const router = require('koa-router')();
const Login = require('./index');

router
  .post('/', async ctx => {
    try {
      console.log(ctx.request.body);
      const user = ctx.request.body.user;
      const password = ctx.request.body.password;
      const login = new Login();
      ctx.status = 201;
      const token = await login.create(user, password);
      console.log(token);
      ctx.body = token;
    } catch (err) {
      ctx.status = 404;
      ctx.body = err;
    }
  })

module.exports = router.routes();
