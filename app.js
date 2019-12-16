const express = require('express');
const app = express();
if (app.get('env') === 'development') {
  require('dotenv').config();
}

const bodyParser = require('body-parser');

//add your routes here
const userRouter = require('./routes/user');

const port = process.env.PORT||3000;

require('./config/db');

// app.set('view engine', 'ejs');//only needed if you intend to use ejs or another view engine
app.use(bodyParser.json());
app.use(userRouter);

app.get('/', (req, res) => {
  res.send('template running ');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
