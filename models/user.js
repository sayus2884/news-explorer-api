const { Schema, model } = require('mongoose');
const { validateEmail } = require('../utils/validation');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validateEmail(v),
      message: 'Invalid Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = model('user', userSchema);
