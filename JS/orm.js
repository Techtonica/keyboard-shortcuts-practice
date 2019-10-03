// access config variables
const { URL } = require('./config.js');

// setting up ORM
var Sequelize = require('sequelize');
var sequelize = new Sequelize( URL, {
  // Look to the next section for possible options
});

// define basic model for a user
var User = sequelize.define('User', {
  uid: Sequelize.INTEGER,
  q_number: Sequelize.STRING,
  last_login: Sequelize.DATE
});

export { User };