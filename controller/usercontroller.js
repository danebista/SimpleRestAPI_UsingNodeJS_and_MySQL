const db = require("../model/db.js")
const uuid = require('uuid')
const crypt = require("../model/encryption");
module.exports = {
    index: function (req, res, next) {
        db.selection(function (err, succ) {
            var arr = succ.map((value, index) => {
                var obj = {
                    name: value.name
                }
                return obj
            });
            res.json(arr);
        });

    },
    bulkUpdate: function (req, res, next) {

        var name = req.body.name;
        db.update(name, function (err, succ) {
            if (err) {
                next({
                    message: "can't update",
                    status: "404"
                })
                return;
            }
            res.send("Update successful");
        })


    },
    bulkRemove: function (req, res, next) {
        db.deletion(function (err, succ) {
            if (err) {
                return next({
                    message: "can't delete",
                    status: "400"
                })

            }
            res.status(200).send("All users deleted");
        })

    },
    personal: function (req, res, next) {
        db.selection(function (err, succ) {
            if (err) {
                next({
                    message: "Bad Input",
                    status: 400
                })
                return;
            }
            let arr = succ.map((value, index) => {
                var obj = {
                    name: value.name,
                    id: value.uid
                }

                if (obj.name == req.params.username) {
                    return obj;
                }
            });

            if (arr.length >= 1) {
                res.status(200).json(arr);
            }

        });

    },
    updatepersonal: function (req, res, next) {
        var name = req.params.username;
        var newname = req.body.newname;
        db.updatePersonal(name, newname, function (err, succ) {
            if (err) {
                next({
                    message: "can't update",
                    status: "404"
                })
                return;
            }
            res.send("Update successful");
        })
    },
    remove: function (req, res, next) {
        var name = req.body.name;
        var username = req.params.username;
        if (name == username) {
            db.deletePersonal(name, function (err, succ) {
                if (err) {
                    return next({
                        message: "can't delete",
                        status: "400"
                    })

                }
                res.status(200).send("Required user deleted");
            })

        }
    },
    register: function (req, res, next) {
        var name = req.body.name;
        var id = uuid.v4();
        var password = req.body.password;
        crypt.encription(password, function (err, success) {
            if (err) {
                console.log("couldn't encrypt")
                return;
            }
            // passcode = succ.iv + "g" + succ.encryptedData;
            db.insertion(id, name, success, function (err, succ) {
                if (err) {
                    return next({
                        message: "can't delete",
                        status: "400"
                    })

                }
                res.status(200).send("Required user inserted");
            })

        })


    }
    //insertion:function(req,res,next)


}