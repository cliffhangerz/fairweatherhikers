const express = require('express');
const appexpress = module.exports = exports = express();
const mongoose = require('mongoose');

const authRoutes = require(__dirname + '/../routes/auth_routes');
const trailRoutes = require(__dirname + '/../routes/trail_routes');

appexpress.use('/api', authRoutes);
appexpress.use('/api', trailRoutes);

module.exports = exports = {
  server: appexpress,
  db: mongoose,
  dbconnect: process.env.MONGO_URI || 'mongodb://localhost/localdbtest'
};
