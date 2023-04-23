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



// //  check and add customer

// exports.CheckAndAdd = async function CheckAndAdd(req, res) {
//   const data = req.body;
//   const schema = Joi.object().keys({
//     custname: Joi.string().required(),
//     custemail: Joi.string().email().required(),
//     createdby: Joi.string(), //.valid(Joi.ref('custemail'))
//     modifiedby: Joi.string(),
//     custaddress: Joi.string().required(),
//     custcontact: Joi.number().required(),
//   });
//   const validate = schema.validate(req.body);
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
//     const [member, created] = await Customer.findOrCreate({
//       where: { custemail: data.custemail, custcontact: data.custcontact },
//       defaults: {
//         custname: data.custname,
//         custemail: data.custemail,
//         custcontact: data.custcontact,
//         custaddress: data.custaddress,
//         createdby: data.createdby,
//         modifiedby: data.modifiedby,
//       },
//     });
//     console.log(created);
//     if (created) {
//       console.log("created");
//       res.send({
//         returnMessage: "Member is Created in databse Successfully",
//         status: true,
//         statusCode: 200,
//         data,
//       });
//     }
//     if (created == false) {
//       console.log("Member is already in databse");
//       res.send({
//         returnMessage: "Member is already in databse",
//         status: false,
//         statusCode: 302,
//         data,
//       });
//     }
//   }
// };

// // simple for loop
// // exports.forloop = (req, res) => {
// //   Customer.findAll({})
// //     .then((result) => {
// //       for (let i = 0; i < result.length; i++) {
// //         let singleUser = result[i].toJSON();
// //         console.log(result[i].toJSON());
// //       }
// //       res.send(result);
// //     })
// //     .catch((err) => console.log(err));
// // };

// // Find all Customer
// exports.ListCostumerExclude = async (req, res) => {
//   // const data = req.params;
//   // const data = req.body;

//   result = {};
//   await Customer.findAll({
//     attributes: { exclude: ["modifieddate", "modifiedby"] },
//   })
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// };

// // Ckeck and delete
// exports.CkeckAndDelete = async (req, res) => {
//   // const data = req.params;
//   const data = req.body;
//   const schema = Joi.object().keys({
//     customerid: Joi.number().required(),
//   });
//   const validate = schema.validate(req.body);
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
//     const Delete_Costomer = await Customer.findOne({
//       where: { customerid: data.customerid },
//       attributes: { exclude: ["modifieddate", "modifiedby"] },
//     });
//     // console.log(Delete_Costomer)
//     if (Delete_Costomer == null) {
//       // console.log("Delete");
//       res.send({
//         returnMessage: "Member is not in databse",
//         status: true,
//         statusCode: 200,
//         data,
//       });
//     } else {
//       const Delete = await Customer.destroy({
//         where: { customerid: data.customerid },
//         attributes: { exclude: ["modifieddate", "modifiedby"] },
//       });
//       // console.log(Delete)
//       res.send({
//         returnMessage: "Member is Deleted in databse Successfully",
//         status: false,
//         statusCode: 302,
//         data,
//       });
//     }
//   }
//   // result = {};
//   // await Customer.findAll({
//   //   attributes: { exclude: ["modifieddate", "modifiedby"] },
//   // })
//   //   .then((result) => res.send(result))
//   //   .catch((err) => console.log(err));
// };
