const express = require('express');
const db = require('./routes/db-config');
const app = express(); 
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
var path = require('path');
app.use(express.static("public"));
app.use(express.json());
const PORT = process.env.PORT || 3306;
app.use('/js',express.static(__dirname+"./public/js"));
app.use('/css',express.static(__dirname+"./public/css"));
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.use(cookieParser());


db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED")
    }
})
// Define Routes

app.use('/', require('./routes/pages'));
app.use('/api', require('./controllers/auth'));

app.listen(PORT);