const router = require('koa-router')();
const Login = require('./index');
const Helper = require('./helper');

router
  .post('/', async (ctx) => {
    try {
      ctx.checkBody('email', 'Este campo es requerido').notEmpty();
      ctx.checkBody('email', 'Este campo tiene un formato no válido').isEmail();
      ctx.checkBody('password', 'Este campo es requerido').notEmpty();
      ctx.checkBody('password', 'Este campo requiere entre 6 y 255 caracteres').len(6, 255);
      const invalid = await ctx.validationErrors();
      if (invalid) {
        ctx.body = Helper.formatValidationInputsError(invalid);
        ctx.status = 400;
      } else {
        ctx.status = 201;
        ctx.body = await Login.create(ctx.request.body.email, ctx.request.body.password);
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        error: err.message,
      };
    }
  });

module.exports = router.routes();
