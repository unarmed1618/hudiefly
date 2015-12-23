'use strict';

angular.module('hudieflyApp')
  .directive('product', function () {
    return {
      templateUrl: 'components/product/product.html',
      restrict: 'E',
      controller: 'ProductCtrl'
    };
  });
