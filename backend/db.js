require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: "Hurst_Chat",
});

module.exports = pool;
