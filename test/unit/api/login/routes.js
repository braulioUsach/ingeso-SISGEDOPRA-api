'use strict';

const chai = require('chai');
const {
  expect
} = chai;

let app = require('../../../../src/app');
const server = app.listen();
const request = require('supertest');

describe('routes: /login', () => {
  it('should return an 404 when missing parameters', (done) => {
    request(server)
      .post('/login')
      .expect(404)
      .end((_, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should return an object with info of app', (done) => {
    request(server)
      .post('/login')
      .send({
        'user': 'validUser',
        'password': 'validPassword'
      })
      .expect(201)
      .end((_, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
