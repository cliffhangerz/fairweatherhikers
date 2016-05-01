const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const trailRouter = require(__dirname + '/routes/trail_routes');
const hikeMatchRouter = require(__dirname + '/routes/hikematch_routes');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/fairwather_db');
const logic = require(__dirname + '/logic/weather');

app.use('/api', trailRouter);
app.use('/api', hikeMatchRouter);

module.exports = app.listen(PORT, () => {
  console.log('Server Spinning on Port:' + PORT);
});
