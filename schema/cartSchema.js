let { Sequelize, Model, DataTypes, QueryTypes, sequelizelcon, Op } = require("../init/dbconfig");

class Cart extends Model { }
Cart.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { tableName: "cart", modelName: "cart", sequelize: sequelizelcon })

module.exports = { Cart, Op }