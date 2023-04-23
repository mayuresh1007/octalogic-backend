const { QueryTypes, where, Op } = require("sequelize");
const express = require("express");
const vehibook = require('../models/UserBooking')
const VehicleDetails = require("../models/VehicleDetails");
const Joi = require("joi");
const vehicle = express.Router()
const cors = require('cors')
vehicle.use(cors())


// Find all Customer
exports.Listbooking = async (req, res) => {
  console.log("Listbooking,\n")
  result = {};
  await vehibook.findAll()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

//##########################
exports.getbookedvehicle = async(req,res)=>{
  const booked = await VehicleDetails.findAll({where:{
    isbooked:true
  }}).then((data)=>{
    res.send(data)
  })
} 

// fetch is available vehicle
exports.fetchAvailableVehicle = async(req,res)=>{
  const booked = await VehicleDetails.findAll({where:{
    isbooked:false
  }}).then((data)=>{
    res.send(data)
  })
}
