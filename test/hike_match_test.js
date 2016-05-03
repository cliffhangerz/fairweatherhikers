const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
// const request = chai.request;
// const Trail = require(__dirname + '/../models/trail');
const matchResults = rquire(__dirname + '/../lib/dataresults');

const main = require(__dirname + '/test_server');
const origin = 'localhost:4000/api';

const ForecastIo = require('forecastio');

describe('API Call test', () => {
  it('should make a REST API call and return weather data ', (done) => {
    var forecastIo = new ForecastIo('ce1e9e7c47068378251586a90ecb14cd');
    forecastIo.forecast('39.2530', '-118.4210').then((data) => {
      expect(data).to.not.eql(null);
      expect(data.daily.data[0].precipProbability).to.be.an('number');
      done();
    });
  });
});


describe('Hike Match test', () => {
  const testData = {
    latitude: 39.2530,
    longitude: -118.4210,
    daily: {
      data: [
        {
          "precipProbability": .22
        },
        {
          "precipProbability": .70
        },
        {
          "precipProbability": .00
        }
      ]
    }
  }


  it('should process and match only day one and day three', () => {
    // var result = goodHike(testData);

    expect(err).to.eql(null);
    expect(result).to.not.eql(null);
  });
});
