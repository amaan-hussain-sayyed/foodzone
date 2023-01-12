let mail = require("nodemailer");


function mailer(mailoption) {
    return new Promise((resolve, reject) => {
        let transpoter = mail.createTransport({
            service: "gmail",
            auth: {
                user: "hsayyedamaan@gmail.com",
                pass: "tgqnabpfknckjfm"
            }

        })
        transpoter.sendMail(mailoption, (error, info) => {
            if (error) {
                console.log(error)
                reject("otp is not send", false)
            }
            resolve(" send mail " + info)

        })
    })
}


module.exports = { mailer }