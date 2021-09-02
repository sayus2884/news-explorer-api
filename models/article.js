const { Schema, model } = require('mongoose');
const { validateUrl } = require('../utils/validation');

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validateUrl(v),
      message: 'Invalid URL.',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validateUrl(v),
      message: 'Invalid URL.',
    },
  },
  owner: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = model('article', articleSchema);
