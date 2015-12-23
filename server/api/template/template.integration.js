'use strict';

var app = require('../..');
var request = require('supertest');

var newTemplate;

describe('Template API:', function() {

  describe('GET /api/templates', function() {
    var templates;

    beforeEach(function(done) {
      request(app)
        .get('/api/templates')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          templates = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      templates.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/templates', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/templates')
        .send({
          name: 'New Template',
          content: 'This is the brand new template!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newTemplate = res.body;
          done();
        });
    });

    it('should respond with the newly created template', function() {
      newTemplate.name.should.equal('New Post');
      newTemplate.content.should.equal('This is the brand new template!!!');
    });

  });

  describe('GET /api/templates/:id', function() {
    var template;

    beforeEach(function(done) {
      request(app)
        .get('/api/templates/' + newTemplate._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          template = res.body;
          done();
        });
    });

    afterEach(function() {
      template = {};
    });

    it('should respond with the requested template', function() {
      template.name.should.equal('New Template');
      template.content.should.equal('This is the brand new template!!!');
    });

  });

  describe('PUT /api/templates/:id', function() {
    var updatedTemplate
    
    beforeEach(function(done) {
      request(app)
        .put('/api/templates/' + newTemplate._id)
        .send({
          name: 'Updated Template',
          content: 'This is the updated template!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTemplate = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTemplate = {};
    });

    it('should respond with the updated template', function() {
      updatedTemplate.name.should.equal('Updated Tempalte');
      updatedTemplate.content.should.equal('This is the updated template!!!');
    });

  });

  describe('DELETE /api/templates/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/templates/' + newTemplate._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when template does not exist', function(done) {
      request(app)
        .delete('/api/templates/' + newTemplate._id)
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
