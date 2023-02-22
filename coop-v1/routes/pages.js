const express = require("express");
const loggedIn = require("../controllers/loggedIn");
const logout = require("../controllers/logout");
const rank = require("../controllers/rank");
const router = express.Router();

router.get('/', loggedIn, (req, res) => {
  
    if (req.user) {
        res.sendFile("register.html",{ root: './public/' });
   } else {
      
        res.render("login");
   }
  
});



// router.get('/register', (req, res) => {
//     res.sendFile("register.html", { root: './public/' })
// });
router.get('/login', (req, res) => {
    res.sendFile("login.html", { root: './public/' })
});
router.get("/logout",logout); 
router.get("/rank",rank); 
// router.get('/profile', authController.isLoggedIn, (req, res) => {
//     if (req.user) {
//         res.sendFile("profile.html", { root: './public/' })
//     } else {
//         res.sendFile("login.html", { root: './public/' });
//     }
// })
module.exports = router;