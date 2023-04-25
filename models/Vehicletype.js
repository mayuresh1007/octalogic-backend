const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = vehicletype =  db.sequelize.define(
  'vehicletype',
  {
    vtId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vehitype: {
      type: Sequelize.STRING,
    //   allowNull: false,
    },
    isactive: {
      type: Sequelize.BOOLEAN,
    //   allowNull: false,
    },
    
    createdby: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Admin"
    },
    
  },
  {
    timestamps: true,// false will not do defalut createion
    tableName: "vehicletype",
    freezeTableName: true,//If freezeTableName is true, sequelize will not try to alter the model name to get the table name. Otherwise, the model name will be pluralized
  }
)

