const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const trailRouter = require(__dirname + '/routes/trail_router');
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/fairwather_db');
const logic = require(__dirname + '/logic/weather');

app.use('/api', trailRouter);

module.exports = app.listen(PORT, () => {
  console.log('Server Spinning on Port:' + PORT);
});
