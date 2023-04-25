const Sequelize = require('sequelize');
const db = {}
// const fs = require('fs');
// const path = require('path');
// const basename = path.basename(__filename);
  // (database name, username, password, and host)
const sequelize = new Sequelize('octadb', 'root', 'Mayuresh@123', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: 0,
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize
db.Sequelize = Sequelize

db.sequelize.sync() // only sync the data with db
// db.sequelize.sync({alter: true}) // only sync the data with db
// db.sequelize.sync({ force: true, alter: true }) // only sync the data with db
  .then(() => {
    console.log('synced database')
  })
async function auth() {
  try {
    await sequelize.authenticate();
    console.log('Data Base Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

auth()
module.exports = db