require("dotenv").config();

const DATABASE_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE
    : process.env.DATABASE;

module.exports = {
  DATABASE_URL
};
