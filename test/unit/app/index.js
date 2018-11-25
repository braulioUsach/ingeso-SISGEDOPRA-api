'use strict';

const chai = require('chai');
const {
  expect
} = chai;

let App = require('../../../src/app');
const server = App.listen();
const request = require('supertest');

describe('App', () => {
  it('should reject with body is an invalid JSON', () => {
    request(server)
      .post('/health')
      .send('{"invalid":,}')
      .type('json')
      .end((err, res) => {
        if (err) {
          expect(res.status).to.be.equal(422);
        };
      });
  });
});
