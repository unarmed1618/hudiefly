'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var templateCtrlStub = {
  index: 'templateCtrl.index',
  show: 'templateCtrl.show',
  create: 'templateCtrl.create',
  update: 'templateCtrl.update',
  destroy: 'templateCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var templateIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './template.controller': templateCtrlStub
});

describe('Thing API Router:', function() {

  it('should return an express router instance', function() {
    templateIndex.should.equal(routerStub);
  });

  describe('GET /api/templates', function() {

    it('should route to template.controller.index', function() {
      routerStub.get
        .withArgs('/', 'templateCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/templates/:id', function() {

    it('should route to template.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'templateCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/templates', function() {

    it('should route to template.controller.create', function() {
      routerStub.post
        .withArgs('/', 'templateCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/templates/:id', function() {

    it('should route to template.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'templateCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/templates/:id', function() {

    it('should route to template.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'templateCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/templates/:id', function() {

    it('should route to template.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'templateCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
