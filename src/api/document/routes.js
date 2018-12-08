const router = require('koa-router')();
const Helper = require('./helper');
const Document = require('./index');
const LoginHelper = require('../login/helper');

router
  .post('/', async (ctx) => {
    try {
      const tokenValues = LoginHelper.readToken(ctx.header.authorization.split(' ').pop());
      ctx.checkBody('name', 'Este campo es requerido').notEmpty();
      ctx.checkBody('name', 'Este campo requiere entre 3 y 255 caracteres').len(3, 255);
      ctx.checkBody('type', 'Este campo es requerido').notEmpty();
      const invalid = await ctx.validationErrors();
      if (invalid) {
        ctx.body = Helper.formatValidationInputsError(invalid);
        ctx.status = 400;
      } else {
        ctx.status = 201;
        ctx.body = await Document.create(ctx.request.body, tokenValues);
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        error: err.message,
      };
    }
  });

router
  .get('/:id', async (ctx) => {
    console.log(ctx.params);
    try {
      ctx.status = 200;
      ctx.body = await Document.read(ctx.params.id);
    } catch (err) {
      ctx.status = 404;
      ctx.body = {
        error: err.message,
      };
    }
  });
module.exports = router.routes();
