const { QueryTypes, where, Op } = require("sequelize");
const express = require("express");
const user = require('../models/Users')
const Joi = require("joi");
const vehicle = express.Router()
const cors = require('cors');
const VehicleDetails = require("../models/VehicleDetails");

vehicle.use(cors())


// Find all Customer
exports.Listuser = async (req, res) => {
  console.log("userlist,\n")
  result = {};
  await user.findAll()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

//##########################
exports.getUserBookings = async(req,res)=>{
  // const user = await user.findOne({ where: { id: userId } });
  const getuser = await userbooking.findAll({ 
    includes:VehicleDetails,
    where: { userId: 1 } 
  })
  .then((data)=>{
    res.send(data)
  })
  // const bookings = await user.getUserBookings();
  // res.send(getuser ).status(200)
}


// Define the getUserBookings() instance method on the User model
// User.prototype.getUserBookings = async function() {
//   const bookings = await UserBooking.findAll({ where: { UserId: this.id } });
//   return bookings;
// };