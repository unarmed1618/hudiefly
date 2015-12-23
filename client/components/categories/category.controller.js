'use strict';

angular.module('hudieflyApp')
  .controller('CategoryCtrl', function ($scope,$http) {
    $scope.addChild = function(subcategory) {
		$scope.category.inherits.push(subcategory);
		console.log($scope.category);
		$scope.updateThisCat();
	}	
	$scope.updateThisCat = function(){
		$http.put('api/categories/'+$scope.category._id, $scope.category);
		$scope.init();
	
	}
	$scope.removeChild = function(subcategory) {
		var removing = -1;
		var size = 0;
		if(! $scope.category.inherits.forEach(function(inheritant, i){
			if(inheritant._id ==subcategory)
				removing = i;
		}))
		{$scope.category.inherits.splice(removing,1); 
		$scope.updateThisCat();
		}
	}
  });
	
