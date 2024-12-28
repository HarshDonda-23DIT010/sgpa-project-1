const mongoose = require('mongoose');

const debug = require("debug");
require('dotenv').config();

debug.enable("development:mongoose");

const dbgr = debug("development:mongoose");


mongoose
.connect(`${process.env.MONGODB_URI}/users`)
.then(() => {
    dbgr("Database connected successfully");
}).catch(err => dbgr(err));


module.exports = mongoose.connection;