const { Schema, model } = require('mongoose');

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
    // set URL validation
  },
  image: {
    type: String,
    required: true,
    // set URL validation

  },
  owner: {
    type: String,
    required: true,
    select: false
  }
})

module.exports = model('article', articleSchema);
