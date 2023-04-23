
module.exports = function (app) {
  const vehitypeContr = require('../controllers/controler.vehicletype.js');
  const vehimodContr = require('../controllers/controler.vehiclemodel.js');
  const vehidetailsContr = require('../controllers/controler.vehicledetail.js');
  const vehibookContr = require('../controllers/controler.vehibook.js');
  const userContr = require('../controllers/controler.user.js');
  

  // app.get("/api", (req, res) => {
  app.get("/", (req, res) => { 
      res.status(200).send({
          message: "welcome to fresh api !!!"
      });
  })

  // get vehicless routes
  app.get("/Listvehicltypes", vehitypeContr.Listvehicltypes);
  app.get("/Listvehiclemodel", vehimodContr.Listvehiclemodel);
  app.get("/Listvehicledetail", vehidetailsContr.Listvehicledetail);
  app.get("/Listbooking", vehibookContr.Listbooking);
  app.get("/getbookedvehicle", vehibookContr.getbookedvehicle);

   // get customers routes
  app.get("/list", userContr.Listuser);
  app.get("/getUserBookings", userContr.getUserBookings);
   
};
