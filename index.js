require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const eventRoutes = require('./routes/event.js');

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  res.setHeader(
    `Access-Control-Allow-Methods`,
    `OPTIONS, GET, POST, PUT, PATCH, DELETE`,
  );
  res.setHeader(`Access-Control-Allow-Headers`, `Content-Type, Authorization`);
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(eventRoutes);


mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@calendar-test-jp-byzkt.mongodb.net/calendar`,
    {useNewUrlParser: true, useUnifiedTopology: true},
  )
  .then(res => {
    app.listen(process.env.PORT || 8080);
  }).catch(err => console.log(err));
