const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 2000;
process.env.MONGO_URI = 'mongodb://localhost/db_test';
const app = require(__dirname + '/../_server');
const Trail = require(__dirname + '/../models/trail');
const User = require(__dirname + '/../models/user');
const errorHandler = require(__dirname + '/../lib/db_error_handler');
process.env.APP_SECRET = 'testsecret';

process.on('exit', () => {
  if (mongoose.connection.db) {
    mongoose.connection.db.dropDatabase();
  }
});

describe('User server:', () => {
  before((done) => {
    app.listen(port, 'mongodb://localhost/db_test', done);
  });

  before((done) => {
    var user = new User({ email: 'warrendoyle@gmail.com', password: 'appalachian' });
    user.save((err, data) => {
      if (err) throw err;
      this.user = data;
      data.generateToken((err, token) => {
        if (err) throw err;
        this.token = token;
        done();
      });
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        app.close(done);
      });
    });
  });

  it('should work on a basic general request', (done) => {
    request('localhost:' + port)
    .get('/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Yo de le he hoo!');
      done();
    });
  });

  it('should POST method for the droids', (done) => {
    request('localhost:' + port)
    .post('/api/trails')
    .set('token', this.token)
    .send({ loc:'Commonwealth Basin - Red Mtn. Pass', lat:47.4605, lon:121.3976, difficulty: 'hard', length:'7.2', time:5.5 }) //eslint-disable-line
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.loc).to.eql('Commonwealth Basin - Red Mtn. Pass');
      expect(res.body.lat).to.eql(47.4605);
      expect(res.body.lon).to.eql(121.3976);
      expect(res.body.difficulty).to.eql('hard');
      expect(res.body.length).to.eql('7.3');
      expect(res.body.time).to.eql(5.5);
      done();
    });
  });

  describe('GET method for the trails:', () => {
    it('should get all trails with GET method', (done) => {
      var token = this.token;
      request('localhost:' + port)
      .get('/api/trails')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });
  });

  describe('PUT and DELETE method for the trails: ', () => {
    beforeEach((done) => {
      var newTrail = new Trail({ loc:'Commonwealth Basin - Red Mtn. Pass', lat:47.4605, lon:121.3976, difficulty: 'hard', length:'7.2', time:5.5 }) //eslint-disable-line
      newTrail.save((err, data) => {
        if (err) return errorHandler(err);
        this.trail = data;
        done();
      });
    });

    afterEach((done) => {
      this.trail.remove(() => {
        done();
      });
    });

    it('should change difficulty to moderate and time to 4.5 hrs with PUT method', (done) => {
      request('localhost:' + port)
      .put('/api/trails/' + this.trail._id)
      .send({ difficulty: 'moderate', time: 4.5 })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.difficulty).to.eql('moderate');
        expect(res.body.time).to.eql(4.5);
        expect(res.body.msg).to.eql('You have changed trail information');
        done();
      });
    });

    it('should trail DELETE method', (done) => {
      request('localhost:' + port)
      .delete('/api/trails/' + this.trail._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Trail Deleted');
        done();
      });
    });
  });
});
