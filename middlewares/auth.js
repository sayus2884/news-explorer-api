const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/not-authorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError('Authorization required.');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-token');
  } catch (err) {
    throw new NotAuthorizedError('Authorization required.');
  }

  req.user = payload;

  next();
};
