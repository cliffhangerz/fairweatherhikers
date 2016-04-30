var ForecastIo = require('forecastio');

var forecastIo = new ForecastIo('ce1e9e7c47068378251586a90ecb14cd');
forecastIo.forecast('47.8669', -121.6780).then(function(data) {
  console.log(JSON.stringify(data, null, 2));
});


