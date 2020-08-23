// access config/env variables
//var config = require("./config.js");
require('dotenv').config();
console.log(`${process.env.URL}`);

// setting up ORM
var Sequelize = require('sequelize');
var sequelize = new Sequelize(`${process.env.URL}`);


// define basic model for a user
const Model = Sequelize.Model;
class User extends Model {}
User.init({
  uid: Sequelize.INTEGER,
  q_number: Sequelize.STRING,
  last_login: Sequelize.DATE
}, { sequelize, modelName: 'user' });

// testing database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

// TODO: make User model accessible from other files
// export { User };