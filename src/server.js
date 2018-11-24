const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const app = new koa();
const port = process.env.PORT || 3000;

app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function(_, ctx) {
    ctx.throw(422, 'Body parse error');
  }
}));

app.use(router.routes());
app.listen(port);

console.log('server started on: ' + port);
