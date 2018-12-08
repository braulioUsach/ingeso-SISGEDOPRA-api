const router = require('koa-router')();
const Document = require('./index');
const _ = require('lodash');

router
  .get('/ping', async ctx => {
    try {
      ctx.status = 200;
      ctx.body = await Document.ping();
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
      ctx.checkBody('name', 'Este campo es requerido').notEmpty();
      ctx.checkBody('name', 'Este campo requiere entre 3 y 255 caracteres').len(3, 255);
      ctx.checkBody('type', 'Este campo es requerido').notEmpty();
      const invalid = await ctx.validationErrors();
      if (invalid) {
        ctx.body = formatValidationInputsError(invalid);
        ctx.status = 400;
      } else {
        ctx.status = 200;
        ctx.body = await Document.create(ctx.request.body);
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
