'use strict';

let {
  expect
} = require('chai');

describe('User', () => {
  let User;
  beforeEach(() => {
    User = require('../../../../src/api/user/index');
  });

  it('create an instance', () => {
    let user = new User();
    expect(user).to.be.instanceof(User);
  });

  it('should reject when missing parameters: firstname', (done) => {
    const params = {};
    let user = new User(params);

    user.create()
      .catch(err => {
        expect(err).to.be.an('error');
        expect(err.message).to.be.equals('Missing paramaters');
        done();
      })
  });

  it('should reject when missing parameters: lastname', (done) => {
    const params = {
      firstname: 'Pepito'
    };
    let user = new User(params);

    user.create()
      .catch(err => {
        expect(err).to.be.an('error');
        expect(err.message).to.be.equals('Missing paramaters');
        done();
      })
  });

  it('should return a new valid JWT', (done) => {
    let login = new Login();

    login.create('user', 'password')
      .then(response => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('type');
        expect(response).to.have.property('token');
        expect(response).to.have.property('expiresIn');
        done();
      })
  });
});