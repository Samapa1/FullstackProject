require("dotenv").config();

const DATABASE_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE
    : process.env.DATABASE;

const REDIS_URL = process.env.REDIS;

module.exports = {
  DATABASE_URL,
  REDIS_URL,
};
