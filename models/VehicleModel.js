const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'vahiclemodel',
  {
    vmodid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    modeltype: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    vehicletypeId: {
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
    tableName: "vahiclemodel",
    freezeTableName: true,//If freezeTableName is true, sequelize will not try to alter the model name to get the table name. Otherwise, the model name will be pluralized
  }
)