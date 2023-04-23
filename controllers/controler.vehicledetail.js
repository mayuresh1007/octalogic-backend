const { QueryTypes, where, Op } = require("sequelize");
const express = require("express");
const vehicleDetail = require('../models/VehicleDetails')
const Joi = require("joi");
const vehicle = express.Router()
const cors = require('cors')
vehicle.use(cors())


// Find all Customer
exports.Listvehicledetail = async (req, res) => {
  console.log("Listvehicledetail,\n")
  result = {};
  await vehicleDetail.findAll()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

//##########################
