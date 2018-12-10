const router = require('koa-router')();
const Helper = require('./helper');
const Transfer = require('./index');
const LoginHelper = require('../login/helper');

router
  .post('/', async (ctx) => {
    try {
      if (!Helper.hasValidCredential(ctx.header.authorization)) {
        ctx.status = 401;
        ctx.body = {
          error: 'Credenciales inválidas',
        };
        return;
      }
      const tokenValues = LoginHelper.readToken(ctx.header.authorization.split(' ').pop());
      ctx.checkBody('document', 'Este campo es requerido').notEmpty();
      ctx.checkBody('document', 'Este campo debe ser un entero').isInt();
      ctx.checkBody('to', 'Este campo es requerido').notEmpty();
      ctx.checkBody('to', 'Este campo debe ser un entero').isInt();
      const invalid = await ctx.validationErrors();
      if (invalid) {
        ctx.body = Helper.formatValidationInputsError(invalid);
        ctx.status = 400;
        return;
      }
      ctx.status = 201;
      ctx.body = await Transfer.create(ctx.request.body, tokenValues);
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        error: err.message,
      };
    }
  });

router
  .post('/:id/approve', async (ctx) => {
    console.log('detalle de approve');
    try {
      if (!Helper.hasValidCredential(ctx.header.authorization)) {
        ctx.status = 401;
        ctx.body = {
          error: 'Credenciales inválidas',
        };
        return;
      }
      const tokenValues = LoginHelper.readToken(ctx.header.authorization.split(' ').pop());
      ctx.status = 201;
      ctx.body = await Transfer.approve(ctx.params.id, tokenValues);
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        error: err.message,
      };
    }
  });

router
  .get('/:id', async (ctx) => {
    try {
      if (!Helper.hasValidCredential(ctx.header.authorization)) {
        ctx.status = 401;
        ctx.body = { error: 'Credenciales inválidas' };
        return;
      }
      const tokenValues = LoginHelper.readToken(ctx.header.authorization.split(' ').pop());
      ctx.status = 200;
      ctx.body = await Transfer.read(ctx.params.id, tokenValues);
    } catch (err) {
      ctx.status = 404;
      ctx.body = {
        error: err.message,
      };
    }
  });

module.exports = router.routes();
