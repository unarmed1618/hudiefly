/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/templates              ->  index
 * POST    /api/templates              ->  create
 * GET     /api/templates/:id          ->  show
 * GET	   /api/templates/path/:path   ->  grab
 * PUT     /api/templates/:id          ->  update
 * DELETE  /api/templates/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Template = require('./template.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Templates
exports.index = function(req, res) {
  Template.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Template from the DB
exports.show = function(req, res) {
  Template.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};
// Gets a single Template from the DB by pathname
exports.grab = function(req, res) {
  Template.findOneAsync({path:req.params.path})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Template in the DB
exports.create = function(req, res) {
  Template.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Template in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Template.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Template from the DB
exports.destroy = function(req, res) {
  Template.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
