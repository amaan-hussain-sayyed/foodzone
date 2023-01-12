let { userRegister, userlogin, userUpdated, resetPassword, forgetPassword, validateaboutMe, cpassword } = require("../model/userModel");

//user registration controller..
async function register(req, res) {
    let check = await userRegister(req.body).catch((err) => {
        return { error: err }
    })

    if (!check || check.error) {
        console.log("errror", check.error)
        return res.status(500).send(
            {
                error: check.error ? check.error : "internal server error"
            })
    }

    return res.status(200).send({ data: "registration successfull" })
}

//user login controller...
async function login(req, res) {
    let data = await userlogin(req.body).catch((err) => {

        return { error: err }
    })
    if (!data || (data && data.error)) {
        console.log(data.error)
        return res.status(500).send({ error: data.error ? data.error : "internal server error" })
    }
    let token = data.token
    return res.status(200).header("x-auth-token", token).send({ data: data.data })
}

//user change password controller..
async function changePassword(req, res) {
    let data = await cpassword(req.body, req.userData).catch((err) => {
        return { error: err }
    })
    if (!data || data.error) {
        console.log(data.error)
        return res.status(400).send({ error: data.error ? data.error : "internal server error" })
    }

    return res.status(200).send({ data: data.data })
}

//forget password controller...
async function forgetpassword(req, res) {
    let data = await forgetPassword(req.body).catch((err) => {
        return { error: err }
    })
    if (!data || data.error) {
        console.log("data.error", data.error)
        return res.status(400).send({ error: data.error ? data.error : "internal server error" })
    }

    return res.status(200).send({ data: data.data })
}

//reser password controller..
async function resetpassword(req, res) {
    let data = await resetPassword(req.body).catch((err) => {
        return { error: err }
    })
    if (!data || data.error) {
        return res.status(400).send({ error: data.error ? data.error : "internal server error" })
    }

    return res.status(200).send({ data: data.data })
}

//update me cotroller...
async function updatedMe(req, res) {
    let data = await userUpdated(req.body, req.userData).catch((err) => {
        return { error: err }
    })
    if (!data || data.error) {
        return res.status(400).send({ error: data.error ? data.error : "internal server error" })
    }

    return res.status(200).send({ data: data.data })
}

//about me controlle...
async function aboutMe(req, res) {
    let data = await validateaboutMe(req.userData).catch((err) => {
        return { error: err }
    })
    if (!data || data.error) {
        return res.status(400).send({ error: data.error ? data.error : "internal server error" })
    }

    return res.status(200).send({ data: data.data })
}







module.exports = { register, login, changePassword, resetpassword, forgetpassword, updatedMe, aboutMe }