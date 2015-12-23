/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/shippings              ->  index
 * POST    /api/shippings              ->  create
 * GET     /api/shippings/:id          ->  show
 * PUT     /api/shippings/:id          ->  update
 * DELETE  /api/shippings/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Shipping = require('./shipping.model');

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

// Gets a list of Shippings
exports.index = function(req, res) {
  Shipping.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Shipping from the DB
exports.show = function(req, res) {
  Shipping.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Shipping in the DB
exports.create = function(req, res) {
  Shipping.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Shipping in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Shipping.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Shipping from the DB
exports.destroy = function(req, res) {
  Shipping.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
