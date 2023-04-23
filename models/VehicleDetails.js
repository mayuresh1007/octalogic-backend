const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'vehicledetails',
  {
    vehcileId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vehicalenumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    vehicalemodtype: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    
    isactive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    
    isbooked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    
    createdby: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "user"
    },
    
 
  },
  {
    timestamps: true,// false will not do defalut createion
    tableName: "vehicledetails",
    freezeTableName: true,//If freezeTableName is true, sequelize will not try to alter the model name to get the table name. Otherwise, the model name will be pluralized
  }
);
// vehicledetails.belongsTo(vahiclemodel);
// vahiclemodel.hasMany(vehicledetails);