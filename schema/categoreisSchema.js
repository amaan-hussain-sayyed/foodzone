let { Sequelize, Model, DataTypes, QueryTypes, sequelizelcon, Op } = require("../init/dbconfig")


class Categories extends Model { }
Categories.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    pid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
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
        allowNull: false
    },

    updated_By: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, { tableName: 'Categories', modelName: "Categories", sequelize: sequelizelcon, Sequelize })

module.exports = { Categories, Op }