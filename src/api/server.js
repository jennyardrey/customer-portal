/* const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/api', router);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
}); */

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

var cors = require('cors');
app.use(cors());
const port = 3001;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use('/api', router);


// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal server error');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
