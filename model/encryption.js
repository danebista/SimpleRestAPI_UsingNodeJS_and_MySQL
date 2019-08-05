/*const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

var encription = function encrypt(text, callback) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    var encrpt = {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex')
    };
    return encrpt;
    // callback(null, encrpt);
}
var decription = function decrypt(text, callback) {
    let iv = Buffer.from(text.iv, 'hex');
    let error = false;
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    if (!decrypted) {
        error = true;
        callback(error)
        return;
    }
    return decrypted.toString();
    // callback(null, decrypted.toString());
}
var hi = encription("whyisnotthisworking");
console.log(hi);
var b = hi.iv + "g" + hi.encryptedData;
var c = b.split('g')

var d = {
    iv: c[0],
    encryptedData: c[1]
}


/*var m = {
    iv: '019084db328852450d8e98c756756432',
    encryptedData: '2073d5c45543f179e98e0cbd9ea9c35c'
}
console.log(m.encryptedData)
//console.log(decription(m))
*/
const bcrypt = require('bcrypt');
var encription = function (text, callback) {
    bcrypt.hash(text, 10, function (err, hash) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, hash);
    });
}
module.exports = {
    encription,
    //decription
}