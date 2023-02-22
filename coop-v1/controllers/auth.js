// const mysql = require("mysql2");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { promisify } = require("util");
// var path = require('path');
// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// });
// exports.login = async (req, res) => {
//     try {
    
//         const { email, password } = req.body;
//         console.log(email);
//         if (!email || !password) {
           
//             return res.status(400).sendFile( path.join(__dirname, "../public/login.html"), {
//                 message: "Please Provide an email and password"
//             })

          
//         }
//         db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//             console.log("getting the query");
//             if (!results || !await bcrypt.compare(password, results[0].password)) {
//                 console.log("incorrect pass");
//                 res.status(401).sendFile(path.join(__dirname, "../public/login.html"), {
//                     message: 'Email or Password is incorrect'
//                 })
//             } else {
//                 const id = results[0].id;

//                 const token = jwt.sign({ id }, process.env.JWT_SECRET, {
//                     expiresIn: process.env.JWT_EXPIRES_IN
//                 });

//                 console.log("the token is " + token);

//                 const cookieOptions = {
//                     expires: new Date(
//                         Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//                     ),
//                     httpOnly: true
//                 }
//                 res.cookie('userSave', token, cookieOptions);
                
//                 res.status(200).redirect("/");
//             }
//         })
//     } catch (err) {
//       console.log(err);
//     }
// }
// exports.register = (req, res) => {
//     console.log(req.body);
//     const { name, email, password, passwordConfirm } = req.body;
//     db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if (results.length > 0) {
//                 return res.sendFile(__dirname + "request.html", {
//                     message: 'The email is already in use'
//                 })
//             } else if (password != passwordConfirm) {
//                 return res.sendFile(__dirname + "request.html", {
//                     message: 'Password dont match'
//                 });
//             }
//         }

//         let hashedPassword = await bcrypt.hash(password, 8);
//         console.log(hashedPassword);

//         db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, results) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 return res.sendFile(__dirname + "request.html", {
//                     message: 'User registered'
//                 });
//             }
//         })
//     })
//     res.send("Form submitted");
// }
// exports.isLoggedIn = async (req, res, next) => {
//     if (req.cookies.userSave) {
//         try {
//             // 1. Verify the token
//             const decoded = await promisify(jwt.verify)(req.cookies.userSave,
//                 process.env.JWT_SECRET
//             );
//             console.log(decoded);

//             // 2. Check if the user still exist
//             db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
//                 console.log(results);
//                 if (!results) {
//                     return next();
//                 }
//                 req.user = results[0];
//                 return next();
//             });
//         } catch (err) {
//             console.log(err)
//             return next();
//         }
//     } else {
//         next();
//     }
// }
// exports.logout = (req, res) => {
//     res.cookie('userSave', 'logout', {
//         expires: new Date(Date.now() + 2 * 1000),
//         httpOnly: true
//     });
//     res.status(200).redirect("/");
// }


const express = require("express");
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const router = express.Router();


router.post("/register",register); 
 router.post("/login",login); 
router.get("/logout",logout); 


module.exports = router; 