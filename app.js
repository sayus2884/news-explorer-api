const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const NotFoundError = require('./errors/not-found-err');

const { PORT = 8080 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/newsdb');

app

  .use('*', () => {
    throw new NotFoundError('Requested resource not found');
  })
  
  .use((err, req, res, next) => {
    const { statusCode, message } = err;

    res.status(statusCode)
      .send({ message: statusCode === 500 ? 'An error occured on the server.' : message });
  })

  .listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
  });
