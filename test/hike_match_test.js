const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const ForecastIo = require('forecastio');

describe('Hike Match test', () => {

  it('should make a REST API call and return weather data ', (done) => {
    var forecastIo = new ForecastIo('ce1e9e7c47068378251586a90ecb14cd');
    forecastIo.forecast('39.2530', '-118.4210').then((data) => {
      console.log(typeof data.daily.data[0].precipProbability);
      expect(data).to.not.eql(null);
      expect(data.daily.data[0].precipProbability).to.be.an('number');
      done();
    });
  });
});
