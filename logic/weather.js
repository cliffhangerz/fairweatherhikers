const ForecastIo = require('forecastio');
const fs = require('fs');

var forecastIo = new ForecastIo('ce1e9e7c47068378251586a90ecb14cd');
forecastIo.forecast('47.8669', -121.6780).then(function(data) {
  var jsonString = JSON.stringify((data) , null, 2);
  var parsed = JSON.parse(jsonString);
  console.log(parsed);
});

