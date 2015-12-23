'use strict';

angular.module('hudieflyApp')
  .directive('category', function () {
    return {
      templateUrl: 'components/categories/category.html',
      restrict: 'E',
      controller: 'CategoryCtrl'
    };
  });
