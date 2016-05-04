module.exports = exports = function(data) {
  var matchRes = '';

  data.forEach((trail) => {

    var results = '';

    if (trail.weatherForecast[0] <= 30) {
      results += 'Today, the chance of rain is ' + trail.weatherForecast[0] + '% \n';
    }
    if (trail.weatherForecast[1] <= 30) {
      results += 'Tomorrow, the chance of rain is ' + trail.weatherForecast[1] + '% \n';
    }
    if (trail.weatherForecast[2] <= 30) {
      results += 'Day after tomorrow, the chance of rain is ' + trail.weatherForecast[2] + '%\n';
    }

    return matchRes += 'The best day to hike\n --' + trail.trailName + '--\nis ' + results + '\n';
  });
  console.log(matchRes);
};
