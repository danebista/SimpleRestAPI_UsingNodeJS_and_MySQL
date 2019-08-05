const db = require("./model/db");
const express = require('express');
const port = require('./config').port;
const app = express();
db.connection();
const morgan = require('morgan');
const apiRoute = require("./routes/api")();
app.use("/", apiRoute);
app.use(morgan("dev"));
app.use(function (req, res, next) {
    next({
        message: "error",
        status: 404
    })
})
app.use(function (err, req, res, next) {
    res.json({
        message: err.message,
        status: err.status || 404
    })
})
app.listen(port, (err, succ) => {
    if (err) {
        console.log("error")
        return;
    }
    console.log("server lisening at port", port);
})