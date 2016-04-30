const User = require(__dirname + '/../models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, process.env.APP_SECRET || 'yabbadabbadoo');
  } catch (e) {
    return res.status(401).json({ msg: 'invalid token' });
  }
  User.findOne({ _id: decoded.id }, (err, user) => {
    if (err) {
      return res.status(401).json({ msg: 'db error' });
    }
    if (!user) return res.status(401).json({ msg: 'no user found' });
    req.user = user;
    next();
  });
};
