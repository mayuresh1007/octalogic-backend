const { QueryTypes, where, Op, DATE } = require("sequelize");
const express = require("express");
const User = require("../models/Users");
const Joi = require("joi");
const vehicle = express.Router();
const cors = require("cors");
const VehicleDetails = require("../models/VehicleDetails");
const UserBooking = require("../models/UserBooking");

vehicle.use(cors());

// Find all Customer
exports.Listuser = async (req, res) => {
  console.log("userlist,\n");
  try {
    result = {};
    const userls = await User.findAll()
      .then((userls) => res.send(userls))
      // res.status(200).send(userls)
      .catch((err) => console.log(err));
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching user bookings");
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userBookings = await UserBooking.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ["userId", "first_name", "last_name"],
        },
        {
          model: VehicleDetails,
          attributes: [
            "vehcileId",
            "vehicalenumber",
            "vmodId",
            "isactive",
            "isbooked",
          ],
        },
      ],
    });

    res.status(200).send(userBookings);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching user bookings");
  }
};

exports.getBookedVehicleByNo = async (req, res) => {
  const data = req.body;
  try {
    const allvehicle = await VehicleDetails.findAll().then((allvehicle) => {
      res.status(200).send(allvehicle);
    });

    const vehiBookingbyNo = await UserBooking.findAll({
      where: { vehcileId: data.vehcileId },
      include: [
        {
          model: VehicleDetails,
          attributes: [
            "vehcileId",
            "vehicalenumber",
            "vmodId",
            "isactive",
            "isbooked",
          ],
        },
        {
          model: User,
          attributes: ["userId", "first_name", "last_name"],
        },
      ],
    });
    res.status(200).send(vehiBookingbyNo);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching vehiBookingbyNo");
  }
};
exports.getUserBookingById = async (req, res) => {
  const data = req.body;
  try {
    const userBookingbyId = await UserBooking.findAll({
      where: { userId: data.userId },
      include: [
        {
          model: User,
          attributes: ["userId", "first_name", "last_name"],
        },
        {
          model: VehicleDetails,
          attributes: [
            "vehcileId",
            "vehicalenumber",
            "vmodId",
            "isactive",
            "isbooked",
          ],
        },
      ],
    });
    res.status(200).send(userBookingbyId);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching getUserBookingById");
  }
};

exports.makeBooking = async (req, res) => {
  const data = req.body;
  try {
    const vehicle = await VehicleDetails.findOne({
      where: { vehcileId: data.vehicleId },
    })

      .then(async (result) => {
        // console.log("isbooked", result.isbooked);
        if (result.isbooked === false) {
          const currentDate = new Date();
          const formattedDate = currentDate
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
          console.log(formattedDate);
          const book = await UserBooking.create(
            {
              userId: data.userId,
              vehcileId: data.vehicleId,
              Bookingfrom: formattedDate,
              Bookingto: formattedDate,
            },
            {
              include: [User],
              where: { userId: data.userId },
            }
          )
            .then(async (data) => {
              const setIsBooked = await VehicleDetails.update(
                { isbooked: true },
                { where: { vehcileId: data.vehcileId } }
              );
            })
            .catch((err) => console.log(err));
          res.send({ status: 200, msg: "Booking confirmed", data: book });
        } else {
          res.send({
            status: 200,
            msg: "Not available, vehicle is already booked !!!",
          });
        }
      })
      // res.status(200).send(userls)
      .catch((err) => console.log(err));
  } catch (e) {
    console.error(e);
    res.send({ status: 500, msg: "An error booking", e: e.message });
  }
};

exports.Submition = async (req, res) => {
  const data = req.body;
  try {
    const userSubmition = await UserBooking.findOne({
      where: {
        [Op.and]: [{ userId: data.userId }, { vehcileId: data.vehicleId }],
      },
    })
      .then(async (data) => {
        const setIsBooked = await VehicleDetails.update(
          { isbooked: false },
          { where: { vehcileId: data.vehcileId } }
        );
        // console.log(setIsBooked);
        return setIsBooked;
      })
      .then(async () => {
        const currentDate = new Date();
        const formattedDate = currentDate
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        // console.log(formattedDate);
        await UserBooking.update(
          { updatedAt: formattedDate },
          {
            where: {
              [Op.and]: [
                { userId: data.userId },
                { vehcileId: data.vehicleId },
              ],
            },
          }
        );
        
      })
      .catch((err) => console.log(err));
    res.send({
      status: 200,
      msg: "Submition confirmed",
      data: [data],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while Submition");
  }
};
