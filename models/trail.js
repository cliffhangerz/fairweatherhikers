const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var trailSchema = new Schema({
  loc: {
    type: String,
    required: true
  },
  lat: {
    type: Number
  },
  lon: {
    type: Number
  },
  difficulty: {
    type: String
  },
  length: {
    type: String
  },
  time: {
    type: Number
  }
});

module.exports = exports = mongoose.model('Trail', trailSchema);
