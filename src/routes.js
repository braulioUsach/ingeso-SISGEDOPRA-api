const Router = require('koa-router');
const health = require('./api/health/routes');

const router = new Router();

router.use('/health', health);

module.exports = router;
