var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});

const connection = function () {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE IF NOT EXISTS users (uid VARCHAR(255) PRIMARY KEY,name VARCHAR(255), password VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    });
}
const insertion = function (uuid, user, password, callback) {
    console.log(password)
    console.log(user)

    var sql = `INSERT INTO users (uid, name, password) VALUES ('${uuid}','${user}', '${password}')`;
    con.query(sql, function (err, result) {
        if (err) {
            callback(err)
            return;
        }
        callback(null, result);
    });

}
const selection = function (callback) {
    con.query(`SELECT * FROM users`, function (err, result, fields) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });
}
const deletion = function (callback) {
    var sql = "DELETE FROM users";
    con.query(sql, function (err, result) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
        console.log("Number of records deleted: " + result.affectedRows);
    });
    /* var num = 0;
     var sql1 = `UPDATE users SET uid = ${num}= ${num+1};`
     con.query(sql1, function (err, result) {
         if (err) throw err;
         var sql2 = `ALTER TABLE users AUTO_INCREMENT = 1`;
         con.query(sql2, function (err, result) {
             if (err) throw err;
             console.log("incremented")
         })
     })*/

}
const update = function (name, callback) {
    var sql = `UPDATE users SET name ='${name}'`;
    con.query(sql, function (err, result) {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}
const updatePersonal = function (name, newname, callback) {
    var sql = `UPDATE users SET name ='${newname}' WHERE name='${name}'`;
    con.query(sql, function (err, result) {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
}
const deletePersonal = function (name, callback) {
    var sql = `DELETE FROM users WHERE name='${name}'`;
    con.query(sql, function (err, result) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
        console.log("Number of records deleted: " + result.affectedRows);
    });
    /* var num = 0;
     var sql1 = `UPDATE users SET uid = ${num}= ${num+1};`
     con.query(sql1, function (err, result) {
         if (err) throw err;
         var sql2 = `ALTER TABLE users AUTO_INCREMENT = 1`;
         con.query(sql2, function (err, result) {
             if (err) throw err;
             console.log("incremented")
         })
     })*/

}
const loginInsertion = function (user, password, callback) {
    var sql = `INSERT INTO login (name, password) VALUES ('${user}', '${password}')`;
    con.query(sql, function (err, result) {
        if (err) {
            callback(err)
            return;
        }
        callback(null, result);
    });

}
module.exports = {
    connection,
    insertion,
    selection,
    deletion,
    update,
    updatePersonal,
    deletePersonal,
    loginInsertion
}