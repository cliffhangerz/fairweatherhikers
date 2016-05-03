const express = require('express');
const User = require(__dirname + '/../models/user');
const bodyParser = require('body-parser').json();
const basicHttp = require(__dirname + '/../lib/basic_http');

var authenticationRouter = module.exports = exports = express.Router();

// authenticationRouter.post('/signup', bodyParser, (req, res) => {
//   if (req.body.email === '' || req.body.email.indexOf('@') < 0 || req.body.email.indexOf('.') < 0) {
//     return res.status(400).json({ msg: 'malformed email' });
//   }
//   if (req.body.password.length < 8) {
//     return res.status(400).json({ msg: 'password should be 8 characters or more' });
//   }
//
authenticationRouter.post('/signup', bodyParser, (req, res) => {

  if ((req.body.email === '') ||
    (req.body.email.indexOf('@') < 0) ||
    (req.body.email.indexOf('.') < 0))
  {

var newUser = new User();
//   var newUser = new User(req.body);
//   var password = req.body.password;
//   newUser.generateHash(password);
//   req.body.password = null;
//   password = null;
//
//   newUser.save((err, user) => {
//     if (err) return res.status(400).json({ msg: 'Could not create user.' });
//     user.generateToken((err, token) => {
//       if (err) return res.status(400).json({ msg: 'Could not generate token, sign in later.' });
//       return res.status(200).json({ msg: 'good signup', token: data.generateToken() });
//     });
//   });
// });

    return res.status(400).json({msg: 'invalid email'});
  }
  if (req.body.password.length < 8)
  {
    return res.status(400).json({msg: 'invalid password'});
  }
  if (req.body.username.length === 0)
  {
    return res.status(400).json({msg: 'invalid username'});
  }

  User.find({'username': req.body.username}, function(err, docs) {
    if (docs.length > 0)
    {
      return res.status(400).json({msg: 'username taken'});
    } else {
      newUser.username = req.body.username;
      newUser.authentication.email = req.body.email;
      newUser.authentication.password = newUser.hashPassword(req.body.password);
      newUser.save((err, data) => {
        if (err) return handleDBError(err);
        return res.status(200).json({msg: 'Signup was a huge success!', token: data.generateToken()});
      });
    }
  });
});





authenticationRouter.get('/signin', basicHttp, (req, res) => {
  User.findOne({ email: req.auth.email }, (err, user) => {
    if (err) return res.status(500).json({ msg: 'There is an error during sign-in, please try again!' }); //eslint-disable-line

    if (!user) return res.status(500).json({ msg: 'Invalid email!' });

    if (!user.compareHash(req.auth.password)) return res.status(500).json({ msg: 'Invalid password!'}); // eslint-disable-line

    user.generateToken((err, token) => {
      if (err) return res.status(500).json({ msg: 'Could not generate token, sign in later.' });

      res.json({ token });
    });
  });
});
