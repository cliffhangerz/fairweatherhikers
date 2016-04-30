const express = require('express');
const jsonParser = require('body-parser').json();
const basicHttp = require(__dirname + '/../lib/basic_http');
const User = require(__dirname + '/../models/user');
const handleDBError = require(__dirname + '/../lib/db_error_handler');
var authenticationRouter = module.exports = exports = express.Router();

authenticationRouter.post('/signup', jsonParser, (req, res) => {
  var newUser = new User();
  var rbe = req.body.email;
  if (rbe === '' || rbe.indexOf('@') < 0 || rbe.indexOf('.') < 0) {
    return res.status(400).json({ msg: 'invalid email' });
  }
  if (req.body.password.length < 8) {
    return res.status(400).json({ msg: 'invalid password' });
  }
  if (req.body.username.length === 0) {
    return res.status(400).json({ msg: 'invalid username' });
  }

  User.find({ 'username': req.body.username }, (err, docs) => {
    if (err) process.stdout.write(err);
    if (docs.length > 0) {
      return res.status(400).json({ msg: 'username taken' });
    }
    newUser.username = req.body.username;
    newUser.authentication.email = req.body.email;
    newUser.authentication.password = newUser.hashPassword(req.body.password);
    newUser.save((err, data) => {
      if (err) return handleDBError(err);
      return res.status(200).json({ msg: 'good job!', token: data.generateToken() });
    });
  });
});
authenticationRouter.get('/signin', basicHttp, (req, res) => {
  User.findOne({ 'username': req.basicHttp.username }, (err, data) => {
    if (err) { return res.status(401).json({ result: 'db error' }); }
    if (!data) {
      return res.status(401).json({ msg: 'no user found' });
    }
    if (data.comparePassword(req.basicHttp.password) === false) {
      return res.status(401).json({ msg: 'wrong password' });
    }
    return res.status(200).json({ token: data.generateToken() });
  });
});
