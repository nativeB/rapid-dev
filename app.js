const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT||3000;
const {errorHandler}=require('./utils');

if (app.get('env') === 'development') {
  require('dotenv').config();
}
require('./config/db');

app.use(bodyParser.json());
app.use(cors());
//routes
const admin = require('./routes/admin');
const patient = require('./routes/patient');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/admin',admin);
app.use('/patient',patient);

app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Hms app running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
