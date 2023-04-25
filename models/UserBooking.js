const Sequelize = require("sequelize");
const db = require("../database/db.js");
const User = require("./Users.js");
const VehicleDetails = require("./VehicleDetails.js");

module.exports = UserBooking = db.sequelize.define(
  "userbooking",
  {
    ubId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: Sequelize.DATE,
      allowNull: false,
    },
    Bookingto: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    createdby: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    timestamps: true, // false will not do defalut createion
    tableName: "userbooking",
    freezeTableName: true, //If freezeTableName is true, sequelize will not try to alter the model name to get the table name. Otherwise, the model name will be pluralized
  }
);


UserBooking.belongsTo(User, { foreignKey: 'userId' });
UserBooking.belongsTo(VehicleDetails, { foreignKey: 'vehcileId' });

// userbooking.associate = function (models) {
//   userbooking.hasMany(models.user, {
//       onDelete: "cascade"
//   });

// };

// Account.associate = function (models) {
//   Account.hasMany(models.History, {
//       onDelete: "cascade"
//   });
//   Account.hasMany(models.User, {
//       onDelete: "cascade"
//   });
// };
