const Router = require('koa-router');
const health = require('./api/health/routes');
const login = require('./api/login/routes');
const user = require('./api/user/routes');

const router = new Router();

router.use('/health', health);
router.use('/login', login);
router.use('/users', user);

module.exports = router;
