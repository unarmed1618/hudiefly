'use strict';

angular.module('hudieflyApp')
  .controller('NavbarCtrl', function ($scope, $http, Auth) {
    $scope.menu = [{
      'title': 'Blog',
      'state': 'blog'
    },
    {
      'title': 'Shop',
      'state': 'shop'
    }
    ];
    $http.get('/api/templates/path/headercontent').then(function(result){
	    $("#headercontent").html(result.data.content);
    });
    // $scope.menu = $http.get('/api/categories/menuitems');

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
