const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const main = require(__dirname + '/../_server');
const origin = 'localhost:4000/api';
var port = process.env.PORT || 3000;
var testDb = process.env.MONGO_URI || 'mongodb://localhost/db_test_auth';
// const zeroBuffer = require(__dirname + '/../lib/zero_buffer.js');

describe('User Authentication: ', () => {
  before(() => {
    main.listen(port, testDb, () => {
      console.log('server up on port:' + port);
    });
  });

  // after((done) => {
  //   main.close(() => {
  //     main.disconnect();
  //     done();
  //   });
  // });

  describe('User Signup Test: ', () => {
    it('should err if email is not entered', (done) => {
      var invalidUser = {
        username: 'Invalid Jones',
        email: '',
        password: '12345678'
      };
      request(origin)
      .post('/signup')
      .send(invalidUser)
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(400);
        expect(res.body.msg).to.eql('invalid email');
        done();
      });
    });
    // it('should err if email is malformed', (done) => {
    //   var invalidUser = {
    //     username: 'Invalid Jones',
    //     email: 'InvalidJones@IJcom',
    //     password: '12345678'
    //   };
    //   request(origin)
    //   .post('/signup')
    //   .send(invalidUser)
    //   .end((err, res) => {
    //     expect(err).to.not.eql(null);
    //     expect(res).to.have.status(400);
    //     expect(res.body.msg).to.eql('invalid email');
    //     done();
    //   });
    // });
    // it('should err if username is not entered', (done) => {
    //   var invalidUser = {
    //     username: '',
    //     email: 'IJ@IJ.com',
    //     password: '12345678'
    //   };
    //   request(origin)
    //   .post('/signup')
    //   .send(invalidUser)
    //   .end((err, res) => {
    //     expect(err).to.not.eql(null);
    //     expect(res).to.have.status(400);
    //     expect(res.body.msg).to.eql('invalid username');
    //     done();
    //   });
    // });
  //   it('should err if password is less than 8 characters', (done) => {
  //     var invalidUser = {
  //       username: 'Invalid Jones',
  //       email: 'IJ@IJ.com',
  //       password: '1234'
  //     };
  //     request(origin)
  //     .post('/signup')
  //     .send(invalidUser)
  //     .end((err, res) => {
//  expect(err).to.not.eql(null);
  //       expect(res).to.have.status(400);
  //       expect(res.body.msg).to.eql('invalid password');
  //       done();
  //     });
  //   });
  //   it('should be able to create a new user', (done) => {
  //     var newUser = {
  //       username: 'Valid Johnson',
  //       email: 'VJ@VJ.com',
  //       password: '12345678'
  //     };
  //     request(origin)
  //     .post('/signup')
  //     .send(newUser)
  //     .end((err, res) => {
  //       expect(err).to.eql(null);
  //       expect(res).to.have.status(200);
  //       expect(res.body.msg).to.eql('Signup was a huge success!');
  //       this.token = res.body;
  //       done();
  //     });
  //   });
  //   it('should err if a user already exists', (done) => {
  //     var sameUser = {
  //       username: 'Valid Johnson',
  //       email: 'VJ@VJ.com',
  //       password: '12345678'
  //     };
  //     request(origin)
  //     .post('/signup')
  //     .send(sameUser)
  //     .end((err, res) => {
  //       expect(err).to.not.eql(null);
  //       expect(res).to.have.status(400);
  //       expect(res.body.msg).to.eql('username taken');
  //       done();
  //     });
  //   });
  });
  // describe('Tests that require an existing doc in the db', () => {
  //   var signinUser = {
  //     username: 'Valid Johnson',
  //     email: 'VJ@VJ.com',
  //     password: '12345678'
  //   };
  //   before((done) => {
  //     request(origin)
  //     .post('/signup')
  //     .send(signinUser)
  //     .end((err, res) => {
  //       if (err) throw err;
  //       expect(res).to.have.status(200);
  //       done();
  //     });
  //   });
  //   it('should approve a login if the user is valid', (done) => {
  //     request(origin)
  //     .get('/signin')
  //     .auth(signinUser.username, signinUser.password)
  //     .end((err, res) => {
  //       if (err) throw err;
  //       expect(err).to.eql(null);
  //       expect(res).to.have.status(200);
  //       expect(res.body.username).to.eql('Valid Johnson');
  //       done();
  //     });
  //   });
  //   it('should prevent login if user is invalid', (done) => {
  //     request(origin)
  //     .get('/signin')
  //     .auth('nosuchuser', 'testpassword')
  //     .end((err, res) => {
  //       if (err) throw err;
  //       expect(res).to.have.status(401);
  //       expect(res.body.msg).to.eql('no user found');
  //       done();
  //     });
  //   });
  //   it('should prevent login if password is incorrect', (done) => {
  //     request(origin)
  //     .get('/signin')
  //     .auth(signinUser.username, '99999999')
  //     .end((err, res) => {
  //       if (err) throw err;
  //       expect(res).to.have.status(401);
  //       expect(res.body.msg).to.eql('wrong password');
  //       done();
  //     });
  //   });
  //   it('should be able to zero out the buffer', (done) => {
  //     var testBuffer = [3, 5, 57, 77777];
  //     zeroBuffer(testBuffer);
  //     expect(testBuffer.toString()).to.eql('\u0000\u0000\u0000\u0000');
  //     done();
  //   });
  // });
});
