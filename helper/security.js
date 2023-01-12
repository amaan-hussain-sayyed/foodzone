let jwt = require("jsonwebtoken");

async function encrypt(data, key) {
    return new Promise((res, rej) => {
        jwt.sign(data, key, (err, token) => {
            if (err) {
                rej(err, "denie")
            }
            res(token)
        })
    })
}

async function decrypt(data, key) {
    return new Promise((res, rej) => {
        jwt.verify(data, key, (err, token) => {
            if (err) {
                rej(err, false)
            }
            res("otp send " + true)
        })
    })
}



module.exports = { encrypt, decrypt }