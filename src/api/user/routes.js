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

router
  .post('/', async ctx => {
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
        ctx.body = formatValidationInputsError(invalid);
        ctx.status = 400;
      } else {
        const user = new User();
        ctx.status = 200;
        ctx.body = await user.create(ctx.request.body);
      }
    } catch (err) {
      ctx.status = 400;
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