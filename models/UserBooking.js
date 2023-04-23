const Sequelize = require('sequelize')
const db = require('../database/db.js')
const user= require('./Users.js');
const VehicleDetails = require('./VehicleDetails.js');
module.exports = userbooking = db.sequelize.define(
  'userbooking',
  {
    ubid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    vehcileId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Bookingfrom: {
      type: Sequelize.DATE ,
      allowNull: false,
    },
    Bookingto: {
      type: Sequelize.DATE,
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
    tableName: "userbooking",
    freezeTableName: true,//If freezeTableName is true, sequelize will not try to alter the model name to get the table name. Otherwise, the model name will be pluralized
  }
);

userbooking.hasMany(user,{foreignKey:'userId'});
userbooking.hasMany(VehicleDetails,{foreignKey:'vehcileId'});
userbooking.belongsTo(user);