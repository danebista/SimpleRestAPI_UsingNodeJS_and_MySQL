const db = require("../model/db.js");
const bcrypt = require('bcrypt');
module.exports = {
    isvalidlogin: function (req, res, next) {
        db.selection(function (err, succ) {
            if (err) {
                next({
                    message: "Bad Input",
                    status: 400
                })
                return;
            }

            var count = 0;
            arr = succ.map((value, index, array) => {
                let c = array.length;
                var obj = {
                    id: value.uid,
                    name: value.name,
                    password: value.password
                }
                bcrypt.compare(req.body.password, obj.password, function (err, res) {
                    if (res && obj.name == req.body.name) {
                        next();
                        return;
                    } else {
                        count += 1;
                        if (count == array.length) {
                            next({
                                message: 'Username and password dont match',
                                status: 400
                            })
                        }
                        console.log(count)
                    }
                });

            });

        })

    }
}