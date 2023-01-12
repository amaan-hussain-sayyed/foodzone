let { Sequelize, Model, DataTypes, QueryTypes, sqlcon, Op } = require("../init/dbconfig");

class Dishes_category extends Model { }

Dishes_category.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, primaryKey: true,
        autoIncrement: true
    },

    dishes_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    is_Deleted: {
        tyeps: DataTypes.BOOLEAN,
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

}, { tableName: "Dishes_category", modelName: "Dishes_category", sequelize: sqlcon })

module.exports = { Dishes_category, Op }