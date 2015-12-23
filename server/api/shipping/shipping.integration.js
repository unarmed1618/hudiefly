'use strict';

var app = require('../..');
var request = require('supertest');

var newShipping;

describe('Shipping API:', function() {

  describe('GET /api/shippings', function() {
    var shippings;

    beforeEach(function(done) {
      request(app)
        .get('/api/shippings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          shippings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      shippings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/shippings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/shippings')
        .send({
          name: 'New Shipping',
          info: 'This is the brand new shipping!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newShipping = res.body;
          done();
        });
    });

    it('should respond with the newly created shipping', function() {
      newShipping.name.should.equal('New Shipping');
      newShipping.info.should.equal('This is the brand new shipping!!!');
    });

  });

  describe('GET /api/shippings/:id', function() {
    var shipping;

    beforeEach(function(done) {
      request(app)
        .get('/api/shippings/' + newShipping._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          shipping = res.body;
          done();
        });
    });

    afterEach(function() {
      shipping = {};
    });

    it('should respond with the requested shipping', function() {
      shipping.name.should.equal('New Shipping');
      shipping.info.should.equal('This is the brand new shipping!!!');
    });

  });

  describe('PUT /api/shippings/:id', function() {
    var updatedShipping

    beforeEach(function(done) {
      request(app)
        .put('/api/shippings/' + newShipping._id)
        .send({
          name: 'Updated Shipping',
          info: 'This is the updated shipping!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedShipping = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedShipping = {};
    });

    it('should respond with the updated shipping', function() {
      updatedShipping.name.should.equal('Updated Shipping');
      updatedShipping.info.should.equal('This is the updated shipping!!!');
    });

  });

  describe('DELETE /api/shippings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/shippings/' + newShipping._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when shipping does not exist', function(done) {
      request(app)
        .delete('/api/shippings/' + newShipping._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
