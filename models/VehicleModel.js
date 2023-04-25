const Sequelize = require('sequelize')
const db = require('../database/db.js');

module.exports = vehiclemodel= db.sequelize.define(
  'vehiclemodel',
  {
    vmodId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    modeltype: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    vtId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },  
    createdby: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "admin"
    },
     
  },
  {
    timestamps: true,// false will not do defalut createion
    tableName: "vehiclemodel",
    freezeTableName: true,//If freezeTableName is true, sequelize will not try to alter the model name to get the table name. Otherwise, the model name will be pluralized
  }
)
