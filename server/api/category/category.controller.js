/**
 * Using Rails-like standard naming convention for endpoints.
 * GET	   /api/categories/menuitems	->  menuitems
 * GET     /api/categories              ->  index
 * POST    /api/categories              ->  create
 * GET     /api/categories/:id          ->  show
 * PUT     /api/categories/:id          ->  update
 * DELETE  /api/categories/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Category = require('./category.model');

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
    Category.populate(entity,{path:'inherits', select:'name'},function(err,entity){ 
      res.status(statusCode).json(entity);
      });
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
    updated.markModified('inherits');
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

// Gets all root Categories from the DB
exports.menuitems = function(req, res) {
  Category.findAsync({"menu":true})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a list of Categories
exports.index = function(req, res) {
  Category.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Category from the DB
exports.show = function(req, res) {
  Category.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Category in the DB
exports.create = function(req, res) {
  Category.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Category in the DB
exports.update = function(req, res) {
	console.log("Got to the exported Update function");
  if (req.body._id) {
    delete req.body._id;
  }
  Category.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
    console.log("Finished the exported update function");
};

// Deletes a Category from the DB
exports.destroy = function(req, res) {
  Category.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
