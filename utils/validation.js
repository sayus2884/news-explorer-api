const validator = require('validator');
const ForbiddenError = require('../errors/forbidden-err');

// Note: must return value, not boolean
// https://stackoverflow.com/questions/58425499/how-to-add-custom-validator-function-in-joi

function validateUrl(string) {
  const result = validator.isURL(string);

  if (result) {
    return string;
  }
  throw new ForbiddenError('Invalid URL.');
}

function validateEmail(string) {
  const result = validator.isEmail(string);

  if (result) {
    return string;
  }
  throw new ForbiddenError('Invalid Email.');
}

module.exports = {
  validateUrl,
  validateEmail,
};
