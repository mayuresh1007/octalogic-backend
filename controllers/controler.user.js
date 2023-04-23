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
  try {
      result = {};
      const userls = await user.findAll()
      .then((userls) => res.send(userls))
      // res.status(200).send(userls)
      .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching user bookings');
    }
};



exports.getUserBookings = async (req, res) => {
  try {
    const userBookings = await userbooking.findAll({
      include: VehicleDetails,
      where: { userId: 1 },
    });

    res.status(200).send(userBookings);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching user bookings');
  }
};

