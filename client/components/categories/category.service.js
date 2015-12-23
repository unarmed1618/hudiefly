'use strict';

angular.module('hudieflyApp')
  .factory('Category', function ($resource) {
    return $resource('/api/categories/:id', {
      id: '@_id'
    },
    {
      get: {
        method: 'GET'
      }
    });
  });
