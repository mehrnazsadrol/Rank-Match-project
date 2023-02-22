const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require ('knex');
const { join } = require('path');
const { userInfo } = require('os');

const app = express();


let initialPath = path.join(__dirname, 'web');
app.use(bodyParser.json());
app.use(express.static(initialPath))

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'coopDB'
})



app.get('/',(req,res)=>{
    res.sendFile(path.join(initialPath, "index.html"));
})

app.get('/login',(req,res)=> {
    res.sendFile(path.join(initialPath, "index.html"));
})

app.listen(3000,(req,res)=>{
console.log('listening on port 3000....');
})