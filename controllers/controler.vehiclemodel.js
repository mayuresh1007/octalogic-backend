const { QueryTypes, where, Op } = require("sequelize");
const express = require("express");
const vehiclemodel = require('../models/VehicleModel')
const Joi = require("joi");
const vehicle = express.Router()
const cors = require('cors')
vehicle.use(cors())


// Find all Customer
exports.Listvehiclemodel = async (req, res) => {
  console.log("Listvehiclemodels,\n")
  result = {};
  await vehiclemodel.findAll()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

//##########################

// update user
exports.UpdateCustomer = async (req, res) => {
  let data = req.body;
  // let result = {}
  const schema = Joi.object().keys({
    customerid: Joi.number(),
    custname: Joi.string(),
    custemail: Joi.string().email(),
    createdby: Joi.string(), //.valid(Joi.ref('custemail'))
    modifiedby: Joi.string(),
    custaddress: Joi.string(),
    custcontact: Joi.number(),
  });
  const validate = schema.validate(data);

  console.log(validate);

  const error = validate.error;
  if (error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      errorCode: 101,
      status: false,
      returnMessage: error.message,
    });
  } else {
    let update_Customer = await Customer.update(
      {
        custname: data.custname,
        custemail: data.custemail,
        custcontact: data.custcontact,
        custaddress: data.custaddress,
        createdby: data.createdby,
        modifiedby: data.modifiedby,
      },
      {
        where: {
          // userid: data.userid,
          customerid: data.customerid,
        },
      }
    )
      .then((result) => {
        if (result) {
          res.send({
            statusCode: 200,
            status: true,
            returnMessage: "user updated successfully",
            data: data,
          });
        } else {
          res.send({
            statusCode: 404,
            status: false,
            returnMessage: "Data not found",
            data: result,
          });
        }
      })
      .catch((error) => {
        console.log(["error"], error);
        res.send({
          errorCode: 103,
          status: false,
          returnMessage: "Error",
          data: error,
        });
      });
    // .then((res,update_user) => res.send(update_user))
  }
  // .catch((err) => console.log(err));
  return update_Customer;
};

// delete User by id
exports.DeleteUser = async (req, res) => {
  let data = req.body;
  let delete_user = await Customer.destroy({
    where: {
      customerid: data.customerid,
      // custname: data.custname,
      // check: data.userid,
    },
  })
    .then((result) => {
      if ((data = !null)) {
        res.send({
          statusCode: 200,
          status: true,
          returnMessage: `Customer whos id ==> ${req.body.customerid}  deleted successfully`,
          data: data,
        });
      }
    })
    .catch((error) => {
      console.log(["error"], error);
      res.send({
        errorCode: 103,
        status: false,
        returnMessage: "Error",
        data: error,
      });
    });
};

