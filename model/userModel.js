let { Users, Op } = require("../schema/userschema");
let { User_permissions } = require("../schema/userPermissionSchema")
let joi = require("joi");
let bcrypt = require("bcrypt");
let randmonstring = require("randomstring")
let { encrypt } = require("../helper/security");
let { mailer } = require("../helper/mailer")

//joi validetion of user registeration
async function valideregister(params) {
    let schema = joi.object({
        email: joi.string().min(12).max(55).required(),
        phoneNo: joi.string().min(10).max(14).required(),
        password: joi.string().min(6).max(12).required(),
        username: joi.string().min(9).max(20).required(),
    }).options({ abortEarly: false });

    let verify = schema.validate(params)

    if (verify.error) {
        let msg = [];
        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: msg };
    }
    return { data: verify.data }
}

//verification of resteration of user..
async function userRegister(params) {
    let valide = await valideregister(params).catch((err) => {
        return { error: err }
    })

    if (!valide || valide.error) {
        return { error: valide.error }
    }

    let user = await Users.create(params).catch((err) => {
        return { error: err }
    })
    if (!user || user.error) {
        console.log("user.error", user.error)
        return { error: "cannot creat user" }
    }

    let password = await bcrypt.hash(params.password, 10).catch((err) => {
        return { error: err }
    })

    if (!password || password.error) {
        return { error: "internal server error" }
    }

    user.password = password

    let result = await user.save().catch((err) => {
        return { error: err }
    })

    if (!result || result.error) {
        return { error: "internal server error2" }
    }

    let permission = await User_permissions.create({ user_id: user.id, permission_id: 1 }).catch((err) => {
        return { error: err }
    })
    if (!permission || permission.error) {
        console.log(permission.error)
        return { error: "cannot give permission" }
    }

    return { data: "register successfull" }
}

//joi validaton for login user...
async function validelogin(params) {
    let schema = joi.object({
        email: joi.string().min(12).max(55).required(),

        password: joi.string().min(6).max(12).required(),

    }).options({ abortEarly: false })

    let verify = schema.validate(params)

    if (verify.error) {
        let msg = [];
        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: msg };
    }
    return { data: verify.data }
}

//verification of login function..
async function userlogin(params) {
    let valide = await validelogin(params).catch((err) => { return { error: err } });

    if (valide.error) { return ({ error: valide.error }) };

    let user = await Users.findOne({ where: { email: params.email } }).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        console.log(user)
        return { error: "user not found" }
    }

    let check = await bcrypt.compare(params.password, user.password).catch((err) => {
        return { error: err }
    });

    if (!check || (check && check.error)) { return { error: "wrong password" } };

    let token = await encrypt({ id: user.id }, "1234").catch((err) => {
        return { error: err }
    });

    if (token.error) { return ({ error: "internal server error" }) };

    user.token = token;

    let result = await user.save().catch((err) => {
        return { error: err }
    })

    if (result.error) { return ({ error: "internal server error" }) };

    return ({ data: "login successfull", token: token })
}


//joi validation for function to change password....
async function verifypassword(params) {
    let schema = joi.object({
        oldPassword: joi.string().min(8).max(12).required(),
        newPassword: joi.string().min(8).max(12).required()
    }).options({ abortEarly: false })

    verify = schema.validate(params)

    if (verify.error) {
        let msg = [];

        for (let i of verify.error.details) {

            msg.push(i.message)

        }
        return { error: msg }
    }

    return { data: verify.value }
}

//verification of changepassword function...
async function cpassword(params, userData) {
    let valide = await verifypassword(params).catch((err) => {
        return { error: err }
    })

    if (valide.error) {
        return { error: valide.error }
    }

    if (params.oldPassword == params.newPassword) {
        return { error: "the old password and new password are same" }
    }

    let user = await Users.findOne({
        where: { id: userData.id }
    }).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        return { error: "cannot find user" }
    }

    let check = await bcrypt.compare(params.oldPassword, user.password
    ).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        console.log(check.error)
        return { error: "wrong password" }
    }

    let ps = await bcrypt.hash(params.newPassword, 10
    ).catch((err) => {
        return { error: err }
    })

    if (!ps || ps.error) {
        return { error: "try gain" }
    }

    user.password = ps

    let data = await user.save().catch((err) => {
        return { error: err }
    })

    if (!data || data.error) {
        return { error: "there are some issues" }
    }

    return { data: "password changed succfully" }
}

//joi validation of forget password..
async function verifyforgetPassword(params) {
    let schema = joi.object({
        email: joi.string().min(10).max(50)
    }).options({ abortEarly: false })

    let verify = schema.validate(params)

    if (!verify || verify.error) {
        msg = [];

        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: verify.value }

}
//verification of forget password ...
async function forgetPassword(params) {
    let check = await verifyforgetPassword(params).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        return { error: check.error }
    }

    let user = await Users.findOne({
        where: { email: params.email }
    }).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        return { error: "user not found" }
    }

    let otp = randmonstring.generate(6)

    user.otp = otp

    let result = await user.save().catch((err) => {
        return { error: err }
    })

    if (!result || result.error) {
        return { error: result.error }
    }

    let mailoption = {
        from: "hsayyedamaan@gmail.com",
        to: user.email,
        subject: "forget password otp",
        text: `if you want to reset you password use this otp ${otp}`
    }

    let sendmail = await mailer(mailoption).catch((err) => {
        return { error: err }
    })

    if (!sendmail || sendmail.error) {
        console.log(sendmail.error)
        return { error: sendmail.error }
    }

    return { data: "otd send" }
}

//joi varification for reset password...
async function verifyResetPassword(params) {
    let schema = joi.object({
        otp: joi.string().min(6).max(6).required(),
        creatpassword: joi.string().min(8).max(12).required(),
    }).options({ abortEarly: false });

    let verify = schema.validate(params)

    if (!verify || verify.error) {
        let msg = [];

        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: msg };
    }
    return { data: verify.value }

}
//verification of reset password function...
async function resetPassword(params) {
    let valide = await verifyResetPassword(params).catch((err) => {
        return { error: err }
    })

    if (!valide || valide.error) {
        return { error: valide.error }
    }

    let user = await Users.findOne({
        where: { otp: params.otp }
    }).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        return { error: user.error }
    }

    let newPassword = await bcrypt.hash(params.creatpassword, 10
    ).catch((err) => {
        return { error: err }
    })

    if (!newPassword || newPassword.error) {
        return { error: "internal server error" }
    }

    user.password = newPassword

    let result = await user.save().catch((err) => {
        return { error: err }
    })

    if (!result || result.error) {
        return { error: "internal server error" }
    }

    return { data: "password reset succefully" }
}

//about me function of....
async function validateaboutMe(userData) {
    let user = await Users.findOne({
        attributes: ['email', "name", "info",
            "mobileNo", "isActive", "isDeleted"],
        where: { id: userData.id }
    }).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        return { error: user.error }
    }

    return { data: user }
}

//joi validation of for user updated...
async function verifyuserUpdated(params) {
    let schema = joi.object({
        email: joi.string().min(10).max(50),
        password: joi.string().min(8).max(12),
        name: joi.string().min(5).max(20),
        info: joi.string().min(3).max(300),
        mobileNo: joi.number().min(10).max(14)
    })
    let verify = schema.validate(params, { abortEarly: true })
    if (verify.error) {
        let msg = [];
        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        console.log(msg)
        return { error: msg }
    }
    return { data: verify.value }

}


async function userUpdated(params, userData) {
    let validate = await verifyuserUpdated(params).catch((err) => {
        return { error: err }
    })

    if (!validate || validate.error) {
        return { error: validate.error }
    }


    let user = await Users.update(params, { where: { id: userData } }).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        return { error: "cannot updated user" }
    }

    return { data: "updated successfully" }

}


module.exports = { userRegister, userlogin, cpassword, forgetPassword, resetPassword, validateaboutMe, userUpdated }