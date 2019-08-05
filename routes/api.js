const router = require("express").Router();
const userRoutes = require('./user.routes')();
const authRoutes = require("./auth.routes")();
module.exports = function () {
    router.use('/api', userRoutes);
    router.use('/api/auth', authRoutes);
    return router;
}