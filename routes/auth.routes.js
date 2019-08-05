const router = require("express").Router();
router.use(require("express").json());
const loginChecker = require('../middlewares/login.checker');
const AuthController = require("../controller/authcontroller");
const loginValidator = require("../middlewares/is.valid.login");
module.exports = function () {
    router.route('/login')
        .post(loginChecker.checker, loginValidator.isvalidlogin, AuthController.login)
    return router;

}