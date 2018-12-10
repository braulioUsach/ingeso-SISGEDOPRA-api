const router = require('koa-router')();
const Helper = require('./helper');
const Document = require('./index');
const LoginHelper = require('../login/helper');

router
  .post('/', async (ctx) => {
    try {
      if (!Helper.hasValidCredential(ctx.header.authorization)) {
        ctx.status = 401;
        ctx.body = { error: 'Credenciales inválidas' };
        return;
      }
      const tokenValues = LoginHelper.readToken(ctx.header.authorization.split(' ').pop());
      ctx.checkBody('name', 'Este campo es requerido').notEmpty();
      ctx.checkBody('name', 'Este campo requiere entre 3 y 255 caracteres').len(3, 255);
      ctx.checkBody('type', 'Este campo es requerido').notEmpty();
      ctx.checkBody('type', 'Este campo debe ser un entero').isInt();
      const invalid = await ctx.validationErrors();
      if (invalid) {
        ctx.body = Helper.formatValidationInputsError(invalid);
        ctx.status = 400;
        return;
      }

      ctx.status = 201;
      ctx.body = await Document.create(ctx.request.body, tokenValues);
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        error: err.message,
      };
    }
  });

router
  .get('/pending', async (ctx) => {
    try {
      if (!Helper.hasValidCredential(ctx.header.authorization)) {
        ctx.status = 401;
        ctx.body = { error: 'Credenciales inválidas' };
        return;
      }
      const tokenValues = LoginHelper.readToken(ctx.header.authorization.split(' ').pop());
      ctx.status = 200;
      ctx.body = await Document.pending(tokenValues);
    } catch (err) {
      ctx.status = 404;
      ctx.body = {
        error: err.message,
      };
    }
  });

router
  .get('/received', async (ctx) => {
    try {
      if (!Helper.hasValidCredential(ctx.header.authorization)) {
        ctx.status = 401;
        ctx.body = { error: 'Credenciales inválidas' };
        return;
      }
      const tokenValues = LoginHelper.readToken(ctx.header.authorization.split(' ').pop());
      ctx.status = 200;
      ctx.body = await Document.received(tokenValues);
    } catch (err) {
      ctx.status = 404;
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
      ctx.body = await Document.read(ctx.params.id, tokenValues);
    } catch (err) {
      ctx.status = 404;
      ctx.body = {
        error: err.message,
      };
    }
  });

router
  .get('/:id/allowedReceivers', async (ctx) => {
    try {
      if (!Helper.hasValidCredential(ctx.header.authorization)) {
        ctx.status = 401;
        ctx.body = { error: 'Credenciales inválidas' };
        return;
      }
      const tokenValues = LoginHelper.readToken(ctx.header.authorization.split(' ').pop());
      ctx.status = 200;
      ctx.body = await Document.allowedReceivers(ctx.params.id, tokenValues);
    } catch (err) {
      ctx.status = 404;
      ctx.body = {
        error: err.message,
      };
    }
  });

router
  .get('/', async (ctx) => {
    try {
      if (!Helper.hasValidCredential(ctx.header.authorization)) {
        ctx.status = 401;
        ctx.body = { error: 'Credenciales inválidas' };
        return;
      }
      const tokenValues = LoginHelper.readToken(ctx.header.authorization.split(' ').pop());
      ctx.status = 200;
      console.log(tokenValues.userId);
      ctx.body = await Document.readByUser(tokenValues.userId);
    } catch (err) {
      console.error(err);
      ctx.status = 404;
      ctx.body = {
        error: err.message,
      };
    }
  });
module.exports = router.routes();
