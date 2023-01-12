let joi = require("joi");

let { User_permissions, Op } = require("../schema/userPermissionSchema");

let { Users } = require("../schema/userschema");

let { Permissions } = require("../schema/permissionsSchema")

//joi validation for userpermission ...
async function validateUserPermission(params) {
    let schema = joi.object({
        user_id: joi.number().min(1).required(),
        permission_id: joi.array().items(joi.number.min(1)).required()
    }).options({ abortEarly: false })

    let valid = schema.validate(params)

    if (valid.error) {
        let msg = []
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }

    return { data: valid.value }
}

async function add(params, userData) {
    let valide = await validateUserPermission(params).catch((err) => {
        return { error: err }
    })

    if (!valide.error || valide.error) {
        return { status: 300, error: "interal server error" }
    }

    let user = await Users.findOne({ where: { id: params.user_id } }).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        return { status: 300, error: "user not found" }
    }

    let checkpermissions = await Permissions.findAll({ where: { id: { [Op.in]: params.permission_id } } }).catch((err) => {
        return { error: err }

    })

    if (!checkpermissions || checkpermissions.error) {
        return { status: 400, error: "internal sever error" }
    }

    if (checkpermissions.length != params.permission_id.length) {
        return { status: 300, error: "permissions not found" }
    }

    let addarry = [];
    for (let ps of params.permission_id) {
        addarry.push({ permission_id: ps, user_id: user.id, created_by: userData.id, updated_by: userData.id })
    }

    let userpermissions = await User_permissions.bulkCreate(addarry).catch((err) => { return { error: err } })

    if (!userpermissions || userpermissions.error) {
        return { status: 400, error: "cannot add permissions" }
    }

    return { status: 200, data: "permission asseceble to user" }

}

//joi validation for user permission
async function validecheckUserPermission(params) {
    let schema = joi.object({
        user_id: joi.number().min(1),

    }).options({ abortEarly: false })

    let valid = schema.validate(params)

    if (valid.error) {
        let msg = []
        for (let i of valid.error.details) {
            msg.push(i.message)
        }
        return { error: msg }
    }

    return { data: valid.value }
}

async function checkuserpermissions(params) {
    let valide = await (params).catch((err) => { return { error: err } })

    if (!valide || valide.error) {
        return { error: valide.error }
    }
    let result = {}

    if (params.user_id) {
        result = { where: { name: params.name } }
    }
    let user = await Permissions.findAll(result).catch((err) => {
        return { error: err }
    })

    if (!user || user.error) {
        return { error: "user  not found" }
    }

    return { data: user }

}

module.exports = { add, checkuserpermissions }



