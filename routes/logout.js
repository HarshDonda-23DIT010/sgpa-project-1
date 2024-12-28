const express = require('express');
const router = express.Router();


router.post('/logout',async (req, res) => {
    res.clearCookie('user');
    res.redirect('/home');
});


module.exports = router;
