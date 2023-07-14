const express = require('express');
const router = express.Router();
const pool = require('./db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// test

router.get('/test', async (req, res, next) => {
  try {
    const query = 'SELECT * FROM users WHERE username = $1';
    const email = 'eg@gmail.com';
const values = [email];
const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    return next(error);
  }
})

// login


router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  
  // Query the database to find the user with the provided email
  const result = await pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );
  if (result.rows.length === 0) {
   
    // If no user was found with the provided email, return an error
    console.log('faillll')
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const user = result.rows[0];
  console.log(bcrypt.compare(password, user.password))
  // Use bcrypt to compare the provided password with the hashed password from the database
  const passwordsMatch = await bcrypt.compare(password, user.password);
  console.log(passwordsMatch)
  if (!passwordsMatch) {
    // If the passwords don't match, return an error
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  // If the passwords match, create a JWT for the user
  const token = jwt.sign({ userId: user.id }, 'your-secret-key');
  console.log('success!!')
  // Return the JWT to the client
  res.json({ token, user }); 
});

// Adds a new user
router.post('/users', async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      'INSERT INTO users (username, password, email, incidents, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, hashedPassword, email, [], 'customer']
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// Adds a new incident
router.post('/incidents', async (req, res, next) => {
  console.log('add incident route')
  const { user_id, whatThreeWords, building_name, location_description, attending_staff, description, images, resolved, resolution } = req.body;
  console.log(user_id, whatThreeWords, building_name, location_description, attending_staff, description, images, resolved, resolution)
  try {
    const result = await pool.query(
      'INSERT INTO incidents (user_id, whatThreeWords, building_name, location_description, attending_staff, description, images, resolved, resolution) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [user_id, whatThreeWords, building_name, location_description, attending_staff, description, images, resolved, resolution]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// gets all users
router.get('/users', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users'    );
    res.json(result);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// get all incidents
router.get('/incidents', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM incidents'    );
    res.json(result);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// get incidents of one user
router.get('/users/:userId/incidents', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM incidents WHERE user_id = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// get one user
router.get('/users/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
