let { Sequelize, Model, DataTypes, QueryTypes, Op } = require("sequelize");
let sqlcon = new Sequelize("mysql://root@localhost/foodorder");
sqlcon.authenticate().then((data) => { console.log("connected") }).catch((err) => {
    console.log("not connected")
})


module.exports = { Sequelize, Model, DataTypes, QueryTypes, Op, sqlcon }
