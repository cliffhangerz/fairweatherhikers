const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const Trail = require(__dirname + '/../models/trail');

const main = require(__dirname + '/test_server');
const origin = 'localhost:4000/api';

describe('Trail Routing test', () => {
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

  it('should work on a basic general request', (done) => {
    request(origin)
    .get('/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Howdy Pardner!!');
      done();
    });
  });

  it('should get all the trails', (done) => {
    request(origin)
    .get('/trail')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body).to.be.an('array');
      done();
    });
  });

  it('should post a new trail', (done) => {
    request(origin)
    .post('/trail/')
    .send({ loc: 'Test Trail',
            lat: 47.2110,
            lon: 122.3220,
            difficulty: 'easy',
            length: 5,
            time: 2
          })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.loc).to.eql('Test Trail');
      expect(res.body.lat).to.eql(47.2110);
      expect(res.body.lon).to.eql(122.3220);
      expect(res.body.difficulty).to.eql('easy');
      expect(res.body.length).to.eql('5');
      expect(res.body.time).to.eql(2);
      done();
    });
  });

  describe('Tests that need data in the database', () => {
    beforeEach((done) => {
      Trail.create({ loc: 'Top Gun' }, (err, data) => {
        if (err) throw err;
        this.testTrail = data;
        done();
      });
    });

    it('should be able to PUT data for a trail', (done) => {
      request(origin)
      .put('/trail/' + this.testTrail._id)
      .send({ loc: 'Goose',
              lat: 47.13245,
              long: 123.6370,
              dificulty: 'easy',
              length: '32',
              time: 4
            })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('You have changed trail information');
        done();
      });
    });

    it('should DELETE a trail', (done) => {
      request(origin)
      .delete('/trail/' + this.testTrail._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('Trail Deleted');
        done();
      });
    });
  });
});
