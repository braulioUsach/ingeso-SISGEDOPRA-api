'use strict';

let {
  expect
} = require('chai');

describe('Health', () => {
  let Health;
  beforeEach(() => {
    Health = require('../../../../src/api/health/index');
  });

  it('create an instance of class', () => {
    let health = new Health();
    expect(health).to.be.instanceof(Health);
  });

  it('should return an object with info of app', () => {
    let health = new Health();
    let status = health.getStatus();
    expect(status).to.be.a('object');
    expect(status).to.have.a.property('application');
    expect(status).to.have.a.property('uptime');
    expect(status).to.have.a.property('memory');
    expect(status).to.have.a.property('node-version');
  });
});