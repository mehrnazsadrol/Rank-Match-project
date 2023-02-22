const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    console.log("********inside hereeeeee");
    const { id, firstName, lastName, email, password } = req.body;
    if (!email || !password || !id || !firstName || !lastName) return res.json({ status: "error", error: "please enter your email and password" });
    else {
        db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
            if (err)
                throw err;
            if (results[0])
                return res.json({ status: "error", error: "The email is already in use" });

            else {
        
                db.query('SELECT id from users WHERE id = ?', [id], async (err, results) => {
                    if (err)
                        throw err;
                    if (results[0])
                        return res.json({ status: "error", error: "The id is already in use" });

                    else {
                        let hashedPassword = await bcrypt.hash(password, 8);
                        console.log(hashedPassword);

                        db.query('INSERT INTO coopDB.users SET ?', { id: id, firstName: firstName, lastName: lastName, email: email, password: hashedPassword, status: 1 }, (error, results) => {
                            if (error) throw error;

                            return res.json({ status: "success", success: 'User registered' });

                        })
                    }
                })
            }

        })
    }

}
module.exports = register; 