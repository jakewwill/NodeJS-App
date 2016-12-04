var myApp = angular.module('myApp', []);
myApp.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {
	var refresh = function() {
	  $http.get('/contactlist')
	  .then(function(response) {
	    $scope.contactlist = response.data;
	  }, function errorCallback(response) {
		  	
	  });
	};

	refresh();

	$scope.addContact = function() {
	  $http.post('/contactlist', $scope.contact)
		  .then(function(response) {
		    $scope.contact = "";
		    refresh();
		  }, function errorCallback(response) {

		  });

	};

	$scope.remove = function(id) {
		$http.delete('/contactlist/' + id)
			.then(function(response) {
				refresh();
			}, function errorCallback(response) {

			});
	};

	$scope.edit = function(id) {
		$http.get('/contactlist/' + id)
			.then(function(response) {
				$scope.contact = response.data;
			}, function errorCallback(response) {

			});
	};

	$scope.update = function(id) {
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact)
			.then(function(response) {
				refresh();
				$scope.contact = "";
			}, function errorCallback(response) {

			});
	}
}])