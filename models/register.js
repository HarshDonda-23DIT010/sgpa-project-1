const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
   email:{
      type: String,
      required: true,
      unique: true,
   },
   name:{
      type: String,
      required: true,
   },
   password:{
      type: String,
      required: true,
   },
   otp:{
      type: String,
      required: true,
   },
   isVerified:{
      type: Boolean,
      default: false,
   }

})

const Register = mongoose.model('register', registerSchema);

module.exports = Register;