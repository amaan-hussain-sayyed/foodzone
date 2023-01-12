let { Categories, Op } = require("../schema/categoreisSchema")
let { auth } = require("../middelwayyer/auth")
let joi = require("joi");





// add function for category
async function add(params, userData) {
    let valide = await verifycategory(params).catch((err) => { return { error: err } })

    if (!valide || valide.error) {
        return { error: valide.error }
    }

    if (params.pid) {
        let parent = await Categories.findOne({ where: { id: params.pid } }).catch((err) => { return { error: err } })

        if (!parent || parent.error) {
            return { error: "category not found" }
        }
    }


    params["createdBy"] = userData.id
    params["updatedBy"] = userData.id

    let category = await Categories.create(params).catch((err) => { return { error: err } })

    if (!category || category.error) {

        return { error: "tyr some time later" }
    }
    return { data: category }

}

async function verifycategory(params) {

    let schema = joi.object({

        id: joi.number(),
        name: joi.string().min(1).max(30).required(),
        pid: joi.number().required(),
        description: joi.string().min(7).max(300).required(),
    })

    let verify = schema.validate(params, { abortEarly: false })

    if (verify.error) {
        let msg = [];
        for (let i of verify.error.details) {
            msg.push(i.message)

        }
        return { error: msg }
    }

    return { data: verify.value }

}



//update function for category 
async function updated(params, userData) {
    let valide = await verifyucategory(params).catch((err) => { return { error: err } })

    if (!valide || valide.error) {
        return { error: valide.error }
    }



    let find = await Categories.findOne({ where: { id: params.id } }).catch((err) => { return { error: err } })

    if (!find || find.error) {

        return { error: "ther some issue try again" }
    }



    let category = await Categories.update({
        name: params.name, pid: params.pid,
        description: params.description, updatedBy: userData.id
    }, { where: { id: find.id } }
    ).catch((err) => { return { error: err } })


    if (!category || category.error) {
        console.log(category.error, "update 72")
        return { error: "ther some issue try again" }
    }

    return { data: "update succeful" }
}

async function verifyucategory(params) {

    let schema = joi.object({

        id: joi.number().required(),
        name: joi.string().min(1).max(30),
        pid: joi.number(),
        description: joi.string().min(7).max(300),
    }).options({ abortEarly: false })

    let verify = schema.validate(params)

    if (verify.error) {
        let msg = [];
        for (let i of verify.error.details) {
            msg.push(i.message)

        }
        return { error: msg }
    }

    return { data: verify.value }

}


//search funtion for category
async function search(params) {
    let valide = await verifyficategory(params).catch((err) => { return { error: err } })

    if (!valide || valide.error) {
        return { error: valide.error }
    }
    let result = {}

    if (params.name) {
        result = { where: { name: params.name } }
    }



    let category = await Categories.findAll(result).catch((err) => {
        return { error: err }
    })

    if (!category || category.error) {
        return { error: "catogary not found" }
    }
    return { data: category }
}

async function verifyficategory(params) {

    let schema = joi.object({


        name: joi.string().min(1).max(30),

    }).options({ abortEarly: false })

    let verify = schema.validate(params)

    if (verify.error) {
        let msg = [];
        for (let i of verify.error.details) {
            msg.push(i.message)

        }
        return { error: msg }
    }

    return { data: verify.value }
}

//joi validetionn for block cstegory....
async function valideactive(params) {
    let schema = joi.object({
        id: joi.number().require(),
        name: joi.string().min(2).max(20).required(),
        active: joi.number().required()

    }).options({ abortEarly: false })

    let veify = schema.validate(params)

    if (veify.error) {
        let msg = [];
        for (let i of veify.error.details) {

            msg.push(i.message)
        }
        return { error: msg }
    }
    return { data: veify.value }
}

async function activecategory(params, userData) {
    let valide = await valideactive(params).catch((err) => {
        return { error: err }
    })

    if (!valide || valide.error) {
        return { error: valide.error }
    }

    let category = await Categories.findOne({ where: { id: params.id } }).catch((err) => {
        return { error: err }
    })

    if (!category || category.error) {
        return { error: "inteernal server error" }
    }

    category.isActive = params.active;

    category.updatedBy = userData.id;

    let result = await category.save().catch((err) => {
        return { error: err }
    })

    if (!result || result.error) {
        return { error: "internal server error" }

    }

    return { data: "category blocked" }
}






module.exports = { add, updated, search, }