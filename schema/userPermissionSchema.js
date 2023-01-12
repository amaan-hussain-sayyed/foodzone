let { Sequelize, Model, DataTypes, QueryTypes, Op, sqlcon } = require("../init/dbconfig")

class User_permissions extends Model { }
User_permissions.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },

  user_id: {
    type: DataTypes.
      INTEGER, allowNull: false
  },

  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_Active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  is_Deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, { tableName: "User_permissions", modelName: "User_permissions", sequelize: sqlcon })


module.exports = { User_permissions, Op }