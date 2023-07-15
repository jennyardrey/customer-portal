const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

var cors = require('cors');
app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use('/api', router);

// Serve the static files
app.use(express.static(path.join(__dirname, 'dist')));

// Define a catch-all route that sends index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal server error');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
