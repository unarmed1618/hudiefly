'use strict';

angular.module('hudieflyApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('shop', {
        url: '/shop/:category',
        templateUrl: 'app/shop/shop.html',
        controller: 'ShopController',
        controllerAs: 'shop'
      })
      .state('detail',{
        url: '/product/:id',
        templateUrl:'app/shop/product.html',
        controller: 'ProductDetailController',
        controllerAs: 'product'
      });
  });
