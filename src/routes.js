const Router = require('koa-router');
const health = require('./api/health/routes');
const login = require('./api/login/routes');
const user = require('./api/user/routes');
const signup = require('./api/signup/routes');
const doc = require('./api/document/routes');

const router = new Router();

router.use('/health', health);
router.use('/login', login);
router.use('/user', user);
router.use('/signup', signup);
router.use('/documents', doc);

module.exports = router;
