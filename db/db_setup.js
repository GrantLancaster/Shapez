import mysql from 'mysql2';
import dotenv from "dotenv";

dotenv.config();
//console.log(process.env);

const settings = {
  host: process.env.HOST,
  user: process.env.MYSQL_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};

export const pool = mysql.createPool(settings).promise();


