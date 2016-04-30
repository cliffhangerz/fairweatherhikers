const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const Trail = require(__dirname + '/../models/trail');
const port = process.env.PORT = 3333;
process.env. MONGO_URI = 'mongodb://localhost/test_trails_db';

const server = require(__dirname + '/../server');

describe('Basic Routing test', () => {
  before((done) => {
    server.listen(port, () => {
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should work on a basic get rquest', (done) => {
    request('localhost:' + port)
    .get('/api/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Howdy Pardner!!');
      done();
    });
  });
});
