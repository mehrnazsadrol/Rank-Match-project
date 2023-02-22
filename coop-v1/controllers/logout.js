const logout = (req, res) => {
    res.clearCookie("userRegistered");
    res.redirect("/login.html");
}
module.exports = logout; 
    