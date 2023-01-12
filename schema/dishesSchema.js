let { Sequelize, Model, DataTypes, QueryTypes, sqlcon, Op } = require("../init/dbconfig");

class Dishes extends Model { }
Dishes.init({
    id: {
        type: DataTypes.INTEGER, allowNull: false,
        primaryKey: true, autoIncrement: true
    },
    name: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock_alert: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    discount: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    discount_types: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    amoutn_after_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    images: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_Active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    is_Deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_By: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    updated_By: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, { tableName: "Dishes", modelName: "Dishes", sequelize: sqlcon })


module.exports = {
    Dishes, Op
}