const express = require('express');
const router = express.Router();
const firstLogin = require('../middlewares/firstlogin.js');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/',firstLogin, function (req, res) {
    res.render('game');
});

module.exports = router;
