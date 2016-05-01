const express = require('express');
const bodyParser = require('body-parser').json();
const basicHttp = require(__dirname + '/../lib/basic_http');
const User = require(__dirname + '/../models/user');
const errorHandler = require(__dirname + '/../lib/db_error_handler');

var authenticationRouter = module.exports = exports = express.Router();

authenticationRouter.post('/signup', bodyParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;

  if (!password) return res.status(500).json({ msg: 'Please enter password.' });

  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(500).json({ msg: 'Could not create user.' });

    user.generateToken((err, token) => {
      if (err) return res.status(500).json({ msg: 'Could not generate token, sign in later.' });

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
