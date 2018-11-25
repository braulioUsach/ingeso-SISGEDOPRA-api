'use strict';

let {
  expect
} = require('chai');

describe('Login', () => {
  let Login;
  beforeEach(() => {
    Login = require('../../../../src/api/login/index');
  });

  it('create an instance', () => {
    let login = new Login();
    expect(login).to.be.instanceof(Login);
  });

  it('should reject when missing parameters: user', (done) => {
    let login = new Login();

    login.create()
      .catch(err => {
        expect(err).to.be.an('error');
        expect(err.message).to.be.equals('Missing paramater');
        done();
      })
  });

  it('should reject when missing parameters: password', (done) => {
    let login = new Login();

    login.create('user')
      .catch(err => {
        expect(err).to.be.an('error');
        expect(err.message).to.be.equals('Missing paramater');
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