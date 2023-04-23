// const express = require('express')
// // const users = express.Router()
// const cors = require('cors')// making connection for frontend
// const Joi = require('joi')
// const User = require('../models/Users.js')
// require('dotenv').config(); // for using .env file 
// users.use(cors())


// // const securePassword = async (password) => {
// //   const salt = await bcrypt.genSalt(10);
// //   const hashedPassword = await bcrypt.hash(password, salt);
// //   return hashedPassword;
// // };


// users.get('/list', async (req, res) => {
//   result = {};
//   const listData =await User.findAll()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });


// // console.log(process.env.JWT_SECRET_KEY)
// users.post('/register', async (req, res) => {
//   const today = new Date()
//   const data = req.body;
//   const schema = Joi.object().keys(
//     {
//       first_name: Joi.string().required(),
//       last_name: Joi.string().required(),
//       // created: today
//     })

//   const validate = schema.validate(data)
//   console.log(validate)
//   const error = validate.error;
//   if (error) {
//     console.log(error.ValidationError)
//     res.status(201).send({
//       status: "failed",
//       message: `failed ${error.details[0].message}`,
//       error: error.details[0].message
//     })
//   } else {
//     const newUser =await User.findOne({
//       where: {
//         email: data.email
//       }
//     })
//       .then(async (result) => {
//         if (result == null) {
//           try {
//             const NewUser = await User.create({
//               first_name: data.first_name,
//               last_name: data.last_name,
//               mobile_number: data.mobile_number,
//               email: data.email,
//               password: data.Password
//             })
//             res.status(201).send({ "status": "success", "message": "Registration Success", "token": token, user: NewUser })
//             console.log(NewUser)
//           } catch (error) {
//             console.log(error)
//             res.send({ "status": "failed", "message": "Unable to Register" })
//           }
//         } else {
//           res.status(200).send({ "status": "failed", "message": "Email already exists" })
//         }
//       }).catch((error) => {
//         console.log(["error"], error);
//         res.send({
//           errorCode: 103,
//           status: false,
//           returnMessage: "Error",
//           data: error,
//         });
//       });
    
//   }
// })
// users.post('/login', (req, res) => {
//   User.findOne({
//     where: {
//       email: req.body.email
//     }
//   })
//     .then( user => {
//       if (user) {
//         if (bcrypt.compareSync(req.body.password, user.password)) {
//           let token = jwt.sign(user.dataValues, process.env.JWT_SECRET_KEY, {
//             expiresIn: '1d'
//           })
//           res.send(token)
//         }
//       } else {
//         res.status(400).json({ error: 'User does not exist' })
//       }
//     })
//     .catch(err => {
//       res.status(400).json({ error: err })
//     })
// })


// module.exports = users