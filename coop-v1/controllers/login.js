const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ status: "error", error: "Please Enter Your Email and Password" });
    else {
        db.query('SELECT * from users WHERE email = ?', [email], async (Err, result) => {
         
            if (Err)
                throw Err;

            if (!result || !await bcrypt.compare(password, result[0].password)){
                console.log("incorrect pass");
                return res.json({ status: "error", error: 'Incorrect Email or Password' });
               
            }

            else {

                const id = result[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                    // httpOnly:true
                });

                console.log("the token is " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('userRegistered', token, cookieOptions);
                res.status(200).redirect("/");
             
                return res.json({ status: "success", success: 'success in logging in ' });
            }
        })
    }

}
module.exports = login; 