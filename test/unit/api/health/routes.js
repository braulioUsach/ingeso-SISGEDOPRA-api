'use strict';

const chai = require('chai');
const {
  expect
} = chai;

let app = require('../../../../src/app');
const server = app.listen();
const request = require('supertest');

describe('routes: /health', () => {
  it('should return an object with info of app', () => {
    request(server)
      .get('/health')
      .expect(200)
      .end((_, res) => {
        expect(res.body).to.have.property('application', 'sisgedopra-api');
      });
  });
});
