require("dotenv").config();

const { DB_URL, NODE_ENV } = process.env;

const isProduction = () => NODE_ENV === "production";
const isDevelopment = () => NODE_ENV === "development";

module.exports = {
  isProduction,
  isDevelopment,
  DB_URL,
};
