const Sequelize = require("sequelize");
const { DB_URL } = require("./config.js");

const sequelize = new Sequelize(DB_URL);

// define basic model for a user
const Model = Sequelize.Model;
class User extends Model {}
User.init(
  {
    q_number: Sequelize.STRING,
    last_login: Sequelize.DATE,
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "user",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const connectToDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};

module.exports = {
  User,
  connectToDb,
};
