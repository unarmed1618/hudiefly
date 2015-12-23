'use strict';
(function() {

function MainController($scope, $http, socket) {
  var self = this;
  $http.get('/api/templates/path/maincontent').then(function(response) {
  	$("#maincontent").html(response.data.content);
  });
}


angular.module('hudieflyApp')
  .controller('MainController', MainController);

})();
