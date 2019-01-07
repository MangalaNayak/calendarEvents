const express = require('express');
const router = express.Router();
const user = require('../controllers/user.js');

router.post('/register', user.user_register);
router.post('/login', user.user_login);
router.post('/logout', user.user_logout);

module.exports = router;
