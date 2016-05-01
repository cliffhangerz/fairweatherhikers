const express = require('express');
const bodyParser = require('body-parser').json();
const basicHttp = require(__dirname + '/../lib/basic_http');
const User = require(__dirname + '/../models/user');
// const errorHandler = require(__dirname + '/../lib/db_error_handler');

var authenticationRouter = module.exports = exports = express.Router();

authenticationRouter.post('/signup', bodyParser, (req, res) => {
  if (req.body.email === '' || req.body.email.indexOf('@') < 0 || req.body.email.indexOf('.') < 0) {
    return res.status(400).json({ msg: 'invalid email' });
  }
  if (req.body.password.length < 8) {
    return res.status(400).json({ msg: 'invalid password' });
  }
  if (req.body.username.length === 0) {
    return res.status(400).json({ msg: 'invalid username' });
  }

  var email = req.body.email;
  req.body.email = null;
  var username = req.body.username;
  req.body.username = null;


  var newUser = new User(req.body);
  var password = req.body.password;
  newUser.generateHash(password);
  req.body.password = null;
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(400).json({ msg: 'Could not create user.' });

    user.generateToken((err, token) => {
      if (err) return res.status(400).json({ msg: 'Could not generate token, sign in later.' });

      res.json({ token });
    });
  });
});

authenticationRouter.get('/signin', basicHttp, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) return res.status(500).json({ msg: 'There is an error during sign-in, please try again!' });

    if (!user) return res.status(500).json({ msg: 'Invalid username!' });

    if (!user.compareHash(req.auth.password)) return res.status(500).json({ msg: 'Invalid password!'}); // eslint-disable-line

    user.generateToken((err, token) => {
      if (err) return res.status(500).json({ msg: 'Could not generate token, sign in later.' });

      res.json({ token });
    });
  });
});
