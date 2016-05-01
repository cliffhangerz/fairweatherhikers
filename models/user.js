const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  username: String,
  authentication: {
    email: String,
    password: String
  }
});
// lets turn that password into some tasty hash
userSchema.methods.hashPassword = function(password) {
  var hash = this.authentication.password = bcrypt.hashSync(password, 8);
  return hash;
};
// lets make sure that the hash worked
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.authentication.password);
};
// gimme a token
userSchema.methods.generateToken = function() {
  return jwt.sign({ id: this._id }, process.env.APP_SECRET || 'yabbadabbadoo');
};
// ship it
module.exports = exports = mongoose.model('User', userSchema);
