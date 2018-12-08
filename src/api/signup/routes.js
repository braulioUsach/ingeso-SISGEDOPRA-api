const router = require('koa-router')();
const SignUp = require('./index');
const Helper = require('./helper');

router
  .post('/', async (ctx) => {
    try {
      ctx.checkBody('firstName', 'Este campo es requerido').notEmpty();
      ctx.checkBody('firstName', 'Este campo requiere entre 3 y 255 caracteres').len(3, 255);
      ctx.checkBody('lastName', 'Este campo es requerido').notEmpty();
      ctx.checkBody('lastName', 'Este campo requiere entre 3 y 255 caracteres').len(3, 255);
      ctx.checkBody('rut', 'Este campo es requerido').notEmpty();
      ctx.checkBody('rut', 'Este campo requiere entre 7 y 12 caracteres').len(7, 12);
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
        ctx.body = await SignUp.create(ctx.request.body);
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        error: err.message,
      };
    }
  });
module.exports = router.routes();
