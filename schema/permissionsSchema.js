let { Sequelize, Model, DataTypes, QueryTypes, Op, sequelizelcon } = require("../init/dbconfig")
class Permissions extends Model { }
Permissions.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    permission: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { tableName: "permissions", modelName: "permissions", sequelize: sequelizelcon })

module.exports = { Permissions, Op }