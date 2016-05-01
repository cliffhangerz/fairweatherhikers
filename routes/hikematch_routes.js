const Router = require('express').Router;
const Trail = require(__dirname + '/../models/trail');
const bodyParser = require('body-parser').json();
const hikeMatchRouter = module.exports = new Router();
const errorHandler = require(__dirname + '/../lib/db_error_handler');


hikeMatchRouter.get('/hikematch', bodyParser, (req, res) => {
    // query database to get an array of hikes
  Trail.find(null, (err, data) => {
    if (err) errorHandler();

    var trailArray = data;

    trailArray.forEach((trail) => {
      var trailLon = trail.lon;
      var trailLat = trail.lat;
      console.log(trailLon, trailLat);

      // send the weathrh request here for each

    });
    res.status(200).json({ msg: 'You found some hikes with nice weather' });
  });

    // save to an array

    // send GET request to Weather api for each hike

    // filter results to only show hikes with weather < 30% rain

    // return this result
});
