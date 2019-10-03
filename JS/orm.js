// access config/env variables
//var config = require("./config.js");
const dotenv = require("dotenv"); 
dotenv.config();

// setting up ORM
var Sequelize = require('sequelize');
var sequelize = new Sequelize( `${process.env.url}`, {
});

// define basic model for a user
var User = sequelize.define('User', {
  uid: Sequelize.INTEGER,
  q_number: Sequelize.STRING,
  last_login: Sequelize.DATE
});

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