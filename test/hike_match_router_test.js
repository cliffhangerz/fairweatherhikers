const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;

const main = require(__dirname + '/test_server');
const origin = 'localhost:4000/api';

describe('Match Routing test', () => {
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
    .get('/hikematch')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Howdy Pardner!!');
      done();
    });
  });
});
