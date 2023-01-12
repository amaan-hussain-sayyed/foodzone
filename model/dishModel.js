let joi = require("joi")
let { Dishes } = require("../schema/dishesSchema");
let { Dishes_category } = require("../schema/dishesCategorySchema");



//joi validation of add dish...

async function validedishadd(params) {

    let schema = joi.object({
        name: joi.string().min(10).max(100).required(),
        description: joi.string().min(40).max(1000).required(),
        details: joi.object().keys({
            material: joi.string().max(20).required(),
            size: joi.string().max(30).required(),
            color: joi.string().max(30).required()
        }).required(),
        stock: joi.number().required(),
        stock_alert: joi.number().required(),
        price: joi.number().required(),
        amount_after_discount: joi.number(),
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

//funtion for adding dish...

async function dishadd(params, userData) {
    let valide = await validedishadd(params).catch((err) => {
        return { error: err }
    })

    if (valide.error) {
        return { status: 300, error: valide.error }
    }

    params.details = JSON.stringify(params.details);

    let add = await Dishes.create({
        name: params.name,
        description: params.description,
        details: params.details,
        stock: params.stock,
        stock_alert: params.stock_alert,
        price: params.price,
        created_by: userData.id,
        updated_by: userData.id
    }).catch((err) => { return { error: err } })

    if (!add || add.error) {
        console.log("user", add)
        return { status: 400, error: "cannot add error" }
    }

    return { data: "dish add succefull" }

}


//joi validation for search dish
async function validesecrhdish(params) {
    let schema = joi.object({
        name: joi.string(),
        category_id: joi.array().items(joi.number()),
    }).options({ abortEarly: false })

    let verify = schema.validate(params)
    if (verify.error) {
        let msg = [];
        for (let i of verify.error.details) {
            msg.push(i.message)
        }
        return { error: verify.error }
    }
    return { data: verify.value }

}

//function for search dish
async function searchdish(params) {
    let valid = await validesecrhdish(params).catch((err) => {
        return { error: err }
    })

    if (!valid || valid.error) {
        return { status: 300, error: valid.error }
    }

    if (params.category_id) {

        let checkcategory = await Dishes_category.findAll({ where: { id: { [Op.in]: params.category_id } } }).catch((err) => {
            return { error: err }

        })

        if (!checkcategory || checkcategory.error) {
            return { status: 400, error: "internal sever error" }
        }

        if (checkcategory.length != params.category_id.length) {
            return { status: 300, error: "category not found" }
        }

        let dish = await Dishes.findAll({ where: { id: { [Op.in]: checkcategory.dish_id } } }).catch.error((err) => {
            return { error: err }
        })

        if (!dish || dish.error) {
            return { status: 300, error: "dish not found" }
        }
        return { status: 200, data: dish }
    }
    let result = {};
    if (params.name) {
        result = { where: { name: params.name } }
    }

    let dish = await Dishes.findAll(result).catch((err) => {
        return { error: err }
    })

    if (!dish || dish.error) {
        return { status: 300, error: "dish not found" }
    }

    return { data: dish }


}

module.exports = {
    dishadd, searchdish
}
