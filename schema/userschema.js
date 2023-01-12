let { Sequelize, Model, DataTypes, QueryTypes, Op, sqlcon } = require("../init/dbconfig");
class Users extends Model { }
Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    info: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otp: {
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
    }
}, { tableName: "Users", modelName: "Users", sequelize: sqlcon });

module.exports = { Users, Op }