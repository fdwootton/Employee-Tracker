const mysql = require('mysql');
// const { connect } = require('node:http2'); //where did this come from?
require('dotenv').config();

const connection = mysql.createConnection(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

connection.connect

module.exports = connection;