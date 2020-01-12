const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT||3000;

if (app.get('env') === 'development') {
  require('dotenv').config();
}
require('./config/db');

app.use(bodyParser.json());

//routes
const admin = require('./routes/admin');
const patient = require('./routes/patient');

app.use(admin);
app.use(patient);

app.get('/', (req, res) => {
  res.send('Hms app running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
