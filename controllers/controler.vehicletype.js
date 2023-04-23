const { QueryTypes, where, Op } = require("sequelize");
const express = require("express");
const vehicletype = require('../models/Vehicletype')
const Joi = require("joi");
const vehicle = express.Router()
const cors = require('cors')
vehicle.use(cors())
// Add new Customer
// exports.Addvehiclemodel = async (req, res) => {
//   const data = req.body;

//   const schema = Joi.object().keys({
//     // customerid: Joi.number(),
//     custname: Joi.string().required(),
//     custemail: Joi.string().email().required(),
//     createdby: Joi.string(), //.valid(Joi.ref('custemail'))
//     modifiedby: Joi.string(),
//     custaddress: Joi.string().required(),
//     custcontact: Joi.number().required(),
//   });
//   const validate = schema.validate(data);

//   console.log(validate);

//   const error = validate.error;
//   if (error) {
//     // send a 422 error response if validation fails
//     res.status(422).json({
//       errorCode: 101,
//       status: false,
//       returnMessage: error.message,
//     });
//   } else {
//     await vehiclemodel.create({
//       // customerid: data.customerid,
//       custname: data.custname,
//       custaddress: data.custaddress,
//       custcontact: data.custcontact,
//       custemail: data.custemail,
//       createdby: data.createdby,
//       modifiedby: data.modifiedby,
//     })
//       .then((result) => {
//         if (result.dataValues.id != 0) {
//           var customerid = result.customerid;
//           res.send({
//             // errorCode: 101,
//             // status: false,
//             returnMessage: "Create New Costumer Details",
//             data: result,
//           });
//         } else {
//           res.send({
//             // errorCode: 101,
//             // status: false,
//             returnMessage: "Failed to Create New Costumer Details",
//             data: result,
//           });
//         }
//       })
//       .catch((error) => {
//         console.log(["error"], error);
//         res.send({
//           errorCode: 103,
//           status: false,
//           returnMessage: "Error",
//           data: error,
//         });
//       });
//   }
// };

// Find all Customer
exports.Listvehicltypes = async (req, res) => {
  console.log("Listvehicltypes,\n")
  result = {};
  await vehicletype.findAll()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

//##########################
