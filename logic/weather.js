const ForecastIo = require('forecastio');
const fs = require('fs');

var forecastIo = new ForecastIo('ce1e9e7c47068378251586a90ecb14cd');
forecastIo.forecast('47.8669', -121.6780).then(function(data) {
  var jsonString = JSON.stringify((data) , null, 2);
  var parsed = JSON.parse(jsonString);
  for (var i = 0; i < 3; i++) {
    var date = new Date(parsed['daily']['data'][i]['time']*1000);
    console.log('Rain Chance for ' + date + ' = ' + parsed['daily']['data'][i]['precipProbability']*100 + ' %');
  }
});
