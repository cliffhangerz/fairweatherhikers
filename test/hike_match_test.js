const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const Trail = require(__dirname + '/../models/trail');

const main = require(__dirname + '/test_server');
const origin = 'localhost:4000/api';

const ForecastIo = require('forecastio');

describe('Hike Match test', () => {
  var serverListen;
  before(() => {
    serverListen = main.server.listen(4000);
    main.db.connect(main.dbconnect, () => {
    });
  });

  after((done) => {
    main.db.connection.db.dropDatabase(() => {
      serverListen.close();
      done();
    });
  });

  it('should make a REST API call and return weather data ', (done) => {
    var forecastIo = new ForecastIo('ce1e9e7c47068378251586a90ecb14cd');
    forecastIo.forecast('39.2530', '-118.4210').then((data) => {
      console.log(typeof data.daily.data[0].precipProbability);
      expect(data).to.not.eql(null);
      expect(data.daily.data[0].precipProbability).to.be.an('number');
      done();
    });
  });

  it('should pull a trail from the database and parse out lon and lat');
});
