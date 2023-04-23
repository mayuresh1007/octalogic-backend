const { QueryTypes, where, Op } = require("sequelize");
const express = require("express");
const vehibook = require('../models/UserBooking')
const VehicleDetails = require("../models/VehicleDetails");
const Joi = require("joi");
const vehicle = express.Router()
const cors = require('cors');
const UserBooking = require("../models/UserBooking");
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
// exports.getbookedvehicle = async (req, res) => {
//   // const booked = await VehicleDetails.findAll({where:{
//   //   isbooked:true
//   // }}).then((data)=>{
//   //   res.send(data)
//   // })
//   try {
//     const availableVehicles = await VehicleDetails.findAll({ where: { isbooked: false } });

//     if (availableVehicles.length === 0) {
//       res.status(404).send('No available vehicles found');
//     } else {
//       // Book the first available vehicle
//       const vehicleToBook = availableVehicles[0];
//       vehicleToBook.isbooked = true;
//       await vehicleToBook.save();

//       res.status(200).send(`Vehicle ${vehicleToBook.id} is now booked`);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while fetching available vehicles');
//   }
// }

// fetch is available vehicle
// exports.fetchAvailableVehicle = async(req,res)=>{
//   const booked = await VehicleDetails.findAll({where:{
//     isbooked:false
//   }}).then((data)=>{
//     res.send(data)
//   })
// }


// app.get('/vehicles', async (req, res) => {
exports.fetchAvailableVehicle = async (req, res) => {
  try {
    const availableVehicles = await VehicleDetails.findAll({ where: { isBooked: false } });
    console.log(availableVehicles);
    // return "done"
    if (availableVehicles.length === 0) {
      res.status(404).send('No available vehicles found');
    } else {
      // Book the first available vehicle
      const vehicleToBook = availableVehicles[0];
      vehicleToBook.isBooked = true;
      await vehicleToBook.save();

      res.status(200).send(`Vehicle ${vehicleToBook.id} is now booked`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching available vehicles');
  }
};
// });


// app.post('/bookings', async (req, res) => {

exports.bookings = async (req, res) => {
  try {
    const { userId, vehicleId, Bookingfrom, Bookingto } = req.body;

    // Check if the vehicle is available for the given dates
    const isVehicleAvailable = await VehicleDetails.findOne({
      where: {
        id: vehicleId,
        isBooked: false,
      },
      include: [
        {
          model: UserBooking,
          where: {
            [Op.or]: [
              {
                Bookingfrom: {
                  [Op.between]: [Bookingfrom, Bookingto],
                },
              },
              {
                Bookingto: {
                  [Op.between]: [Bookingfrom, Bookingto],
                },
              },
            ],
          },
        },
      ],
    });

    if (!isVehicleAvailable) {
      res.status(400).send('The vehicle is not available for the given dates');
      return;
    }

    // Create a new booking
    const newBooking = await UserBooking.create({
      userId,
      vehicleId,
      pickupDate,
      returnDate,
    });

    // Mark the vehicle as booked
    const vehicleToBook = await VehicleDetails.findByPk(vehicleId);
    vehicleToBook.isBooked = true;
    await vehicleToBook.save();

    res.status(201).send(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while booking the vehicle');
  }
};
// });
