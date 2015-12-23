'use strict';
(function() {

function BlogController($scope, $http, socket,$stateParams) {
  var self = this;
	$http.get('/api/posts').then(function(response){
		self.posts = response.data;
	});
	self.category = $stateParams.category;
	
}
function PostDetailController($scope, $http, socket, $stateParams){
	var self = this;
	
	$http.get('/api/posts/'+$stateParams.id).then(function(response){
		self.post = response.data;
	}).then(function(){
		$("#content").html(self.post.body);
	});
}
angular.module('hudieflyApp')
  .controller('BlogController', BlogController)
  .controller('PostDetailController', PostDetailController);
})();
