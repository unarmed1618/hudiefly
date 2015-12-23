'use strict';
angular.module('hudieflyApp')
  .controller('ProdManCtrl', function($scope, $http, Auth, User){
  $scope.save = function() {
  	if($scope.product._id){
	 	 $http.put("api/products/"+$scope.product._id, $scope.product).then(function(){
 		 	alert("Product has been updated");
 	 	  });
 	 }
  	else{	
		$http.post("api/products", $scope.product).then(function(){
			alert("Product has been saved");
			$scope.product = {};
		});
    }
    setTimeout(function(){$scope.init();}, 200);
  }
  $scope.init = function() {
	$scope.product = {};
	$scope.product.gallery = [];
	$scope.product.variables = [];
	$scope.nope = "Yep";
  	
	$http.get("api/products").then(function(data){
	 	 $scope.products = data.data;
    });
  }
  $scope.init();
  $scope.edit = function(product){
  	$scope.product = product;
  };
  $scope.delete = function(productID){
  	if(confirm("Are you sure?")){
  		$http.delete("api/products/"+productID).then(function(){
	  		alert("Successfully deleted!");
	  		$scope.init();
  		});
  	}
  };
  }).controller('TemplateManCtrl', function($scope, $http, Auth, User){
  $scope.save = function() {
  	if($scope.template._id){
	 	 $http.put("api/templates/"+$scope.template._id, $scope.template).then(function(){
 		 	alert("Template has been updated");
 	 	  });
 	 }
  	else{	
		$http.post("api/templates", $scope.template).then(function(){
			alert("Template has been saved");
			$scope.template = {};
		});
    }
    setTimeout(function(){$scope.init();}, 200);
  }
  $scope.init = function() {
	$scope.template = {};
	$scope.nope = "Yep";
  	
	$http.get("api/templates").then(function(data){
	 	 $scope.templates = data.data;
    });
  }
  $scope.init();
  $scope.edit = function(template){
  	$scope.template = template;
  };
  $scope.delete = function(templateID){
  	if(confirm("Are you sure?")){
  		$http.delete("api/templates/"+templateID).then(function(){
	  		alert("Successfully deleted!");
	  		$scope.init();
  		});
  	}
  };
  })
  .controller('BlogManCtrl', function($scope, $http, Auth, User){
  $scope.save = function() {
  	if($scope.post._id){
	 	 $http.put("api/posts/"+$scope.post._id, $scope.post).then(function(){
 		 	alert("Post has been updated");
 	 	  });
 	 }
  	else{	
		$http.post("api/posts", $scope.post).then(function(){
			alert("Post has been saved");
			$scope.post = {};
		});
    }
    setTimeout(function(){$scope.init();}, 200);
  }
  $scope.init = function() {
	$scope.post = {};
	$scope.nope = "Yep";
  	
	$http.get("api/posts").then(function(data){
	 	 $scope.posts = data.data;
    });
  }
  $scope.init();
  $scope.edit = function(post){
  	$scope.post = post;
  };
  $scope.delete = function(postID){
  	if(confirm("Are you sure?")){
  		$http.delete("api/posts/"+postID).then(function(){
	  		alert("Successfully deleted!");
	  		$scope.init();
  		});
  	}
  };
  })
  .controller('AdminCtrl', function($scope, $http, Auth, User) {

	

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      $scope.users.splice(this.$index, 1);
    };
  })
  .controller('CatManCtrl', function($scope, $http, Auth) {
  //The model builds the tree.
  // ADD SOCKETS!
  //
  $scope.init = function() {
	  $http.get("api/categories").then(function(data){
	  	$scope.categories = data.data;
	  //console.log($scope.menuTree);
	  });
	  //Quick display for whether or not shit is operating successfully.
   	  $scope.nope = "Yep";
   	  $scope.newRootCategory = {};

  }
  $scope.addRootCategory = function() {
  	if(!$scope.newRootCategory.name) return;
  	$scope.newRootCategory.children = [];
  	//console.log($scope.newRootCategory);
  	$http.post("api/categories", $scope.newRootCategory).then(function(){
  	$scope.init();
  	});
  };

  $scope.deleteCategory = function(category) {
	  $http.delete("api/categories/"+category._id).then(function(){
  		$scope.init();
	  });
  
  };
  $scope.init();
  
  });
  