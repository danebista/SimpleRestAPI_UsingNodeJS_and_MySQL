const db = require("../model/db.js")
const crypt = require("../model/encryption");
module.exports = {
    login: function (req, res, next) {
        var name = req.body.name;
        var password = req.body.password;
        crypt.encription(password, function (err, success) {
            if (err) {
                console.log("couldn't encrypt")
                return;
            }

            db.loginInsertion(name, success, function (err, succ) {
                if (err) {
                    return next({
                        message: "can't delete",
                        status: "400"
                    })

                }
                res.status(200).send("You are logged in");
            })

        })
    }
}