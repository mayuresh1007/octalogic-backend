var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
require('dotenv').config()
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// const Users = require('./routes/Users') // register the routers
// const Vehicle = require('./routes/Vehicleroutes') // register the routers
// app.use('/users', Users)
// app.use('/vehicle', Vehicle)

const routes = require("./routes/Vehicleroutes");
routes(app);//register the route ==>// const routes = require('./routes/ecomroutes')
app.listen(port, function() {
  console.log(`backend app listening at http://localhost:${port}`);
})