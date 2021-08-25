const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors, celebrate, Joi } = require('celebrate');
require('dotenv').config();

const { validateEmail } = require('./utils/validation');
const NotFoundError = require('./errors/not-found-err');

const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { createUser, login } = require('./controllers/users');

const requestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});

const { PORT = 8080, DB = 'mongodb://localhost:27017/dev' } = process.env;

const app = express();

mongoose.connect(DB);

app
  .use(cors())
  .options('*', cors())
  .use(requestLogger)

  .use(requestLimiter)
  .use(helmet())
  .use(bodyParser.json())
  .use(cookieParser())

  .post('/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().custom(validateEmail),
      password: Joi.string().required(),
    }),
  }), login)
  .post('/signup', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().custom(validateEmail),
      password: Joi.string().required(),
    }),
  }), createUser)

  .use(auth)

  .use(userRoutes)
  .use(articleRoutes)
  .use('*', () => {
    throw new NotFoundError('Requested resource not found');
  })

  .use(errorLogger)
  .use(errors())
  .use((err, req, res, next) => {
    const { statusCode, message } = err;

    res.status(statusCode)
      .send({ message: statusCode === 500 ? 'An error occured on the server.' : message });
  })

  .listen(PORT, () => {});
