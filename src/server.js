const koa = require('koa');
const router = require('./routes');
const app = new koa();
const port = process.env.PORT || 3000;


app.listen(port);
app.use(router.routes());

console.log('server started on: ' + port);
