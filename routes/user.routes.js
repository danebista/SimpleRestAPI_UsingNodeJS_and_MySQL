const router = require("express").Router();
router.use(require("express").json());
const isValidUser = require("../middlewares/is.valid.user");
const UserController = require("../controller/usercontroller");
const validation = require('../middlewares/joi');
const registerChecker = require('../middlewares/login.checker');
module.exports = function () {
    router.route('/')
        .get(UserController.index)
        .put(validation.checker, UserController.bulkUpdate)
        .delete(UserController.bulkRemove)
    router.route('/:username')
        .get(isValidUser.isvalid, UserController.personal)
        .put(isValidUser.isvalid, UserController.updatepersonal)
        .delete(isValidUser.isvalid, UserController.remove)
    router.route('/register')
        .post(registerChecker.checker, UserController.register)

    return router;

}