const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
// const request = chai.request;
// const errorHandler = require(__dirname + '/../lib/db_error_handler');
const mongoose = require('mongoose');
// const Trail = require(__dirname + '/../models/trail');
// const goodHike = require(__dirname + '/../lib/goodHike');
const port = process.env.PORT = 6666;
const server = require(__dirname + '/../_server');

const ForecastIo = require('forecastio');

process.env.APP_SECRET = 'secrettest';

process.on('exit', () => {
  if (mongoose.connection.db) {
    mongoose.connection.db.dropDatabase();
  }
});

describe('API Call test', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/hike_match_test_db', done);
    console.log('server on port ' + port);
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        server.close(done);
      });
    });
  });

  it('should make a REST API call and return weather data ', (done) => {
    var forecastIo = new ForecastIo('ce1e9e7c47068378251586a90ecb14cd');
    forecastIo.forecast('39.2530', '-118.4210').then((data) => {
      expect(data).to.not.eql(null);
      expect(data.daily.data[0].precipProbability).to.be.an('number');
      done();
    });
  });
});
