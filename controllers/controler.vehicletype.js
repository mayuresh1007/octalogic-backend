const { QueryTypes, where, Op } = require("sequelize");
const express = require("express");
const vehicletype = require('../models/Vehicletype')
const Joi = require("joi");
const vehicle = express.Router()
const cors = require('cors')
vehicle.use(cors())


exports.Listvehicltypes = async (req, res) => {
  console.log("Listvehicltypes,\n")
  result = {};
  await vehicletype.findAll()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

//##########################
