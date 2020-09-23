const Sequelize = require("sequelize");
const { DB_URL, isDevelopment } = require("./config.js");

const setupSequelize = () => {
  if (isDevelopment()) {
    return new Sequelize({
      dialect: "sqlite",
      storage: "database.sqlite",
    });
  } else {
    return new Sequelize(DB_URL || "postgres://localhost/keyboard-practice");
  }
};
const sequelize = setupSequelize();

// define basic model for a user
const Model = Sequelize.Model;
class User extends Model {}
User.init(
  {
    uid: Sequelize.INTEGER,
    q_number: Sequelize.STRING,
    last_login: Sequelize.DATE,
  },
  { sequelize, modelName: "user", timestamps: false }
);

const connectToDb = async () => {
  await sequelize.authenticate();
  await User.sync();
};

module.exports = {
  User,
  connectToDb,
};
