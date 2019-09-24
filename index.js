require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('bodyParser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PW}@calendar-test-jp-byzkt.mongodb.net/calendar`,
    {useNewUrlParser: true},
  )
  .then(res => {
    app.listen(process.env.PORT || 8080).catch(err => console.log(err));
  });
