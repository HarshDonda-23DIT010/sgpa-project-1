const express = require('express');
const router = express.Router();
const signup = require("../models/register");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


router.post('/login', async (req, res) => {
   const { email, password } = req.body;
   const user = await signup.findOne({ email });

   if (user && bcrypt.compareSync(password, user.password)) {
      if (user.isVerified) {
         let token = jwt.sign({ "userId": user._id }, "harsh")

         res.cookie('user', token);
         res.redirect('/home');
      } else {
         res.send("Please verify your email");
      }
   } else {
      res.send("Invalid email or password");
   }
});


module.exports = router;
