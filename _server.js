const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const trailRouter = require(__dirname + '/routes/trail_routes');
const logic = require(__dirname + '/logic/weather');
const authRouter = require(__dirname + '/routes/auth_routes');

app.use('/api', trailRouter);
app.use('/api', authRouter);

module.exports = exports = {
  server: { close: function() {
    throw new Error('Server not started yet!');
  }
},
  listen: function(port, mongoString, cb) {
    mongoose.connect(mongoString);
    return this.server = app.listen(port, cb);
  },
  close: function(cb) {
    this.server.close();
    if (cb) cb();
  }
};
