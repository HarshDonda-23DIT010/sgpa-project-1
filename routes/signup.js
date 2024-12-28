const express = require('express');
const router = express.Router();
const signup = require("../models/register");
const bcrypt = require('bcrypt');
const email = require('../middlewares/email');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// Home route
router.get('/', async (req, res) => {
    try {
        const userId = req.cookies.user; // Fetch the user ID from cookies
        let user = null;

        if (userId) {
            user = await signup.findById(userId); // Fetch user details from DB if userId exists
        }

        res.render('home', { userId, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Send email route
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

// Register route
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

        res.cookie('user', user._id); // Set user ID in cookies
        res.render('home', { userId: user._id, user }); // Pass the user and userId to the EJS template
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
