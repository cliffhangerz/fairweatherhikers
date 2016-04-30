const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const Trail = require(__dirname + '/../models/trail');
process.env. MONGO_URI = 'mongodb://localhost/test_trails_db';

const main = require(__dirname + '/test_server');
const origin = 'localhost:4000/api';

describe('Basic Routing test', () => {
  var serverListen;
  before((done) => {
    serverListen = main.server.listen(4000);
    main.db.connect(main.dbconnect, () => {
      done();
    });
  });

  after((done) => {
    main.db.connection.db.dropDatabase(() => {
      serverListen.close();
      done();
    });
  });

  it('should work on a basic get rquest', (done) => {
    request(origin)
    .get('/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Howdy Pardner!!');
      done();
    });
  });
});
