const router = require('koa-router')();
const Login = require('./index');
const _ = require('lodash');

router
  .post('/', async ctx => {
    try {
      ctx.checkBody('email', 'Este campo es requerido').notEmpty();
      ctx.checkBody('email', 'Este campo tiene un formato no válido').isEmail();
      ctx.checkBody('password', 'Este campo es requerido').notEmpty();
      ctx.checkBody('password', 'Este campo requiere entre 6 y 255 caracteres').len(6, 255);
      const invalid = await ctx.validationErrors();
      if (invalid) {
        ctx.body = formatValidationInputsError(invalid);
        ctx.status = 400;
      } else {
        const login = new Login();
        ctx.status = 201;
        ctx.body = await login.create(ctx.request.body.email, ctx.request.body.password);
      }
    } catch (err) {
      ctx.status = 404;
      ctx.body = {
        error: err.message
      };
    }
  })

function formatValidationInputsError(errors) {
  let resp = {};
  _.chain(errors).groupBy('param').map(function(v, i) {
    resp[i] = _.map(v, 'msg');
  }).value();

  return resp;
}

module.exports = router.routes();