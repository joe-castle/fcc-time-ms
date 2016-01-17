'use strict';

const request = require('supertest');
const expect = require('chai').expect;

const app = require('../src/routes');

describe('Express Routes', () => {
  describe('To root path', () => {
    it('Returns 200 status', (done) => {
      request(app)
        .get('/')
        .expect(200, done)
    });
    it('Returns a Content-Type of HTML', (done) => {
      request(app)
        .get('/')
        .expect('Content-Type', /html/, done);
    });
  });
  describe('To timestamp api', () => {
    it('Returns 200 status', (done) => {
      request(app)
        .get('/1453064481')
        .expect(200, done)
    });
    it('Returns a Content-Type of JSON', (done) => {
      request(app)
        .get('/1453064481')
        .expect('Content-Type', /json/ , done);
    });
    it(`Returns a JSON object with unix and natural language timestamp,
        when passed a unix timestamp`, (done) => {
      let expectedValue = {
        unix: 1453064481,
        natural: 'January 17th, 2016'
      };
      request(app)
        .get('/1453064481')
        .expect((res) => {
          expect(res.body).to.deep.equal(expectedValue);
        })
        .end(done);
    });
    it(`Returns a JSON object with unix and natural
        language timestamp, when passed a natural language timestamp`, (done) => {
      let expectedValue = {
        unix: 1453032000,
        natural: 'January 17th, 2016'
      };
      request(app)
        .get('/January%2017th,%202016')
        .expect((res) => {
          expect(res.body).to.deep.equal(expectedValue);
        })
        .end(done);
      });
    it(`Returns null for both values if neither a
        unix time or natural language are found`, () => {
      let expectedValue = {
        unix: null,
        natural: null
      }
      request(app)
        .get('/goblinwins')
        .expect((res) => {
          expect(res.body).to.deep.equal()
        })
    });
  });
});
