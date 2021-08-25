const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const NotAuthorizedError = require('../errors/not-authorized-err');
const AlreadyExistsError = require('../errors/already-exists-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  let user;

  User.findOne({ email }).select('+password')
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Email does not exist.');
      }

      user = data;

      return bcrypt.compare(password, user.password);
    })

    .then((isMatch) => {
      if (!isMatch) {
        throw new NotAuthorizedError('Incorrect password.');
      }

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-token',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });

      res.send({ token });
    })

    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new AlreadyExistsError('User already exists.');
      }
    })

    .then(() => bcrypt.hash(password, 10))

    .then((hashed) => User.create({
      name, email, password: hashed,
    }))

    .then(() => res.send({ name, email }))

    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User ID not found.');
      }

      res.send(user);
    })

    .catch(next);
};

module.exports = {
  login,
  createUser,
  getCurrentUser,
};
