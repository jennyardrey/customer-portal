const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config()
/*

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });


 */

// Create a new connection pool to the database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // only required for some databases
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};