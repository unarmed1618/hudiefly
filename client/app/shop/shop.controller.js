'use strict';
(function() {

function ShopController($scope, $http, socket,$stateParams) {
  var self = this;
	$http.get('/api/products').then(function(response){
		self.products = response.data;
	});
	self.category = $stateParams.category;
	
}
function ProductDetailController($scope, $http, $compile,socket, $stateParams){
	var self = this;
	
	$http.get('/api/products/'+$stateParams.id).then(function(response){
		self.product = response.data;
	}).then(function(){
	$scope.viewing = self.product.primaryImgUrl;
	}).then(function(){
	$compile(self.product.desc)($scope);
	
	}).then(function(){
		$("#descdiv").html(self.product.desc);
	}).then(function(){
	LazyTableHandler($("#descdiv lazy-table"));
	});
	$scope.setImg = function(i){
	$scope.viewing = self.product.gallery[i];
	}
}

function LazyTableHandler(e){

var rows = $(e).html().split(';');
			var result = "<table class='lazy'><tbody>";
			rows.forEach(function(row, i ){
				if(i==0) var tag = "th";
				else var tag = "td";
				result = result + "<tr>";
				row.split(',').forEach(function(piece){
					result = result + "<"+tag+">"+piece+ "</"+tag+">";
				});
				result = result + "</tr>";
			});
			result = result+"</tbody></table>";
			//console.log(result);
      	$(e).html(result);
}
angular.module('hudieflyApp')
  .controller('ShopController', ShopController)
  .controller('ProductDetailController', ProductDetailController);
 
})();
