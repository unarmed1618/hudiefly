'use strict';

angular.module('hudieflyApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('blog', {
        url: '/blog',
        templateUrl: 'app/blog/blog.html',
        controller: 'BlogController',
        controllerAs: 'blog'
      })
      .state('blog detail', {
        url: '/post/:id',
        templateUrl:'app/blog/post.html',
        controller: 'PostDetailController',
        controllerAs: 'post'
      });
  });
