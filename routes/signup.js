const express = require('express');
const router = express.Router();
const signup = require("../models/register");
const bcrypt = require('bcrypt');
const email = require('../middlewares/email');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const jwt = require("jsonwebtoken");


router.get('/', async (req, res) => {
    try {
        const token = req.cookies.user; 
        let user = null;
        if (token) {
            let data = jwt.verify(token, "harsh");
            if (data) {
                user = await signup.findById(data.userId); 
            }
        }

        res.render('home', { user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});


router.post('/sendemail', async (req, res) => {
    try {
        const { name, email: userEmail, password } = req.body;

        const existingUser = await signup.findOne({ email: userEmail });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email is already registered' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashpassword = await bcrypt.hash(password, 10);

        const user = await signup.create({
            name,
            email: userEmail,
            password: hashpassword,
            otp,
        });

        await email(userEmail, otp);

        res.json({ success: true, message: 'OTP sent successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});


router.post('/register', async (req, res) => {
    try {
        const { email: userEmail, otp } = req.body;

        const user = await signup.findOne({ email: userEmail });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        user.isVerified = true;
        await user.save();

        let token = jwt.sign({ "userId" : user._id }, "harsh")
        res.cookie('user', token );

        res.redirect('/home'); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;