const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT = 8080 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/newsdb');

app
  .listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
  });
