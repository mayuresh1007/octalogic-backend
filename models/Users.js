const Sequelize = require("sequelize");
const db = require("../database/db.js");
const userBooking = require("./UserBooking.js");

module.exports = user = db.sequelize.define(
  "user",
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
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
    tableName: "user",
    freezeTableName: true, //If freezeTableName is true, sequelize will not try to alter the model name to get the table name. Otherwise, the model name will be pluralized
  }
);
