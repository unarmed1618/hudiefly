'use strict';

angular.module('hudieflyApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
	  .state('category manager', {
	  	url: '/admin/catman',
	  	templateUrl: 'app/admin/catman.html',
	  	controller: 'CatManCtrl'
      })
      .state('blog manager', {
        url: '/admin/blogman',
        templateUrl: 'app/admin/blogman.html',
        controller: 'BlogManCtrl'
      })
      .state('template manager', {
        url: '/admin/tempman',
        templateUrl: 'app/admin/tempman.html',
        controller: 'TemplateManCtrl'
      })
	  .state('product manager', {
	  	url: '/admin/prodman',
	  	templateUrl: 'app/admin/prodman.html',
	  	controller: 'ProdManCtrl'
      });
  });
