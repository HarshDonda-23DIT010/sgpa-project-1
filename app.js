const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const db = require('./connections/mongo');
const registerRoute = require('./routes/signup'); 
const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;


app.use("/home", registerRoute);


app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});