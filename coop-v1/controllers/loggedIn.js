const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");

const loggedIn = async (req, res, next) => {
  
    if (!req.cookies.userRegistered) return next();

    try {
        // 1. Verify the token
        const decoded = await promisify(jwt.verify)(req.cookies.userRegistered,
            process.env.JWT_SECRET
        );
                  

        //             // 2. Check if the user still exist
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
            //                 console.log(results);
            if (err) return next();
            if (!results) {
                return next();
            }
            req.user = results[0];
            return next();
       
         
 
        })
    }
    catch (err) {
       
            if (err) return next();
        }
    }

module.exports = loggedIn; 