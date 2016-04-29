const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const trailRouter = require(__dirname + '/../routes/trail_router');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/fairwather_db')

app.use('/api', trailRouter);
app.listen(port, () => console.log('Server Spinning on Port:' + port));
