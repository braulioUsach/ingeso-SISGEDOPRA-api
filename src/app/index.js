const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const respond = require('koa-respond');

const router = require('../routes');
const app = new Koa();

app.use(helmet());

app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function(_, ctx) {
    ctx.throw(422, 'Body parse error');
  }
}));

app.use(respond());

app.use(router.routes());
app.use(router.allowedMethods());
module.exports = app;
