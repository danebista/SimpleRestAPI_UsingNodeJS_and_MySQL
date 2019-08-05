const db = require("../model/db.js");
module.exports = {
    isvalid: function (req, res, next) {
        db.selection(function (err, succ) {
            if (err) {
                next({
                    message: "Bad Input",
                    status: 400
                })
                return;
            }

            arr = succ.map((value, index) => {
                var obj = {
                    name: value.name,
                    id: value.uid
                }
                if (obj.name == req.params.username) {
                    return obj;
                }

            });
            if (arr[0] == undefined) {
                next({
                    message: "No such user",
                    status: 400
                })
                return;
            } else if (arr[0].name) {
                next();
            }

        })

    }
}