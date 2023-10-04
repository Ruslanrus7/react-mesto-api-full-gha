const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/cards', auth, require('./cards'));
router.use('/users', auth, require('./users'));

module.exports = router;
