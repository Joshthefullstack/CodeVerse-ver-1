import pool from './index';
const {TABLES} = require("../utils/constatnts");


const createTables = async () => {
    console.log("Creating tables... in schema", process.env.DB_SCHEMA);
    try {
  
      await pool.query(`CREATE TABLE IF NOT EXISTS ${TABLES.USERS}(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        avatar_url TEXT,
        bio VARCHAR(355),
        status INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    console.log("Users table created successfully");
      } 
      catch(error)
      {
        console.log(error);
      }
    }

    export default createTables;