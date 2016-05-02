const ForecastIo = require('forecastio');
const Router = require('express').Router;
const Trail = require(__dirname + '/../models/trail');
const hikeMatchRouter = module.exports = new Router();
const errorHandler = require(__dirname + '/../lib/db_error_handler');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

hikeMatchRouter.get('/hikematch', jwtAuth, (req, res) => {
  Trail.find({ userId: req.user._id }, (err, data) => {
    if (err) return errorHandler(err, res);

    var trailArray = data;

    trailArray.forEach((trail) => {
      var trailLoc = trail.loc;
      var trailLon = trail.lon;
      var trailLat = trail.lat;

      var forecastIo = new ForecastIo('ce1e9e7c47068378251586a90ecb14cd');
      forecastIo.forecast(trailLat, '-' + trailLon).then(function(data) {
        var jsonString = JSON.stringify((data) , null, 2);
        var parsed = JSON.parse(jsonString);

        for (var i = 0; i < 3; i++) {
          var dateString = new Date(parsed['daily']['data'][i]['time']*1000); // eslint-disable-line
          dateString = new Date(dateString).toUTCString();
          date = dateString.split(' ').slice(0, 4).join(' ');
          console.log(trailLoc + ' rain chance for ' + date + ' = ' +
           parsed['daily']['data'][i]['precipProbability']*100 + ' %'); // eslint-disable-line
        }
      });
    });
      res.status(200).json({ msg: 'You found some hikes with nice weather' });
  });
});

