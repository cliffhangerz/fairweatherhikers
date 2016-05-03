const express = require('express');
const User = require(__dirname + '/../models/user');
const bodyParser = require('body-parser').json();
const basicHttp = require(__dirname + '/../lib/basic_http');
const handleDBError = require(__dirname + '/../lib/db_error_handler');

var authenticationRouter = module.exports = exports = express.Router();


authenticationRouter.post('/signup', bodyParser, (req, res) => {
  var newUser = new User();
  if (req.body.email === '' || req.body.email.indexOf('@') < 0 || req.body.email.indexOf('.') < 0) { // eslint-disable-line
    return res.status(400).json({ msg: 'invalid email' });
  }
  if (req.body.password.length < 8) {
    return res.status(400).json({ msg: 'invalid password' });
  }

  User.find({ 'email': req.body.email }, (err, docs) => {
    if (err) return handleDBError(err);
    if (docs.length > 0) {
      return res.status(400).json({ msg: 'username taken' });
    }
    newUser.email = req.body.email;
    newUser.password = newUser.generateHash(req.body.password);
    req.body.password = null;
    newUser.save((err, data) => {
      if (err) return handleDBError(err);
      return res.status(200).json({ msg: 'good signup', token: data.generateToken() });// eslint-disable-line
    });
  });
});

authenticationRouter.get('/signin', basicHttp, (req, res) => {
  User.findOne({ email: req.email }, (err, data) => {
    if (err) return res.status(401).json({ msg: 'sign-in error' });
    if (!data) return res.status(401).json({ msg: 'Invalid email!' });

    if (data.compareHash(req.basicHttp.password) === false) {
      return res.status(401).json({ msg: 'wrong password' });
    }

    data.generateToken((err, token) => {
      if (err) return res.status(401).json({ msg: 'Could not generate token, sign in later.' });
      res.json({ token });
    });
  });
});
