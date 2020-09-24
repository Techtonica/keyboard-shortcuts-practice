require("dotenv").config();

const { DB_URL, NODE_ENV } = process.env;

const isProduction = () => NODE_ENV === "production";
const isDevelopment = () => NODE_ENV === "development";

const getDefaultDbUrl = () => {
  if (isDevelopment()) {
    return "sqlite:dev-db.sqlite";
  }
  throw new Error("DB_URL must be specified in production mode");
};

module.exports = {
  isProduction,
  isDevelopment,
  DB_URL: DB_URL || getDefaultDbUrl(),
};
