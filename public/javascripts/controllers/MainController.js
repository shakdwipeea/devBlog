angular.module('BlogApp')
.controller('MainController',function  ($scope,$window,$rootScope,authentication) {

	if ($window.sessionStorage.token) {
		$rootScope.loggedIn = true;
	} else {
		$rootScope.loggedIn = false;
	}
	
	if ($window.sessionStorage.username) {
		$rootScope.name = $window.sessionStorage.username;
	} else {
		$rootScope.name = '';
	}


	$scope.logout = function  () {
		authentication.logout();
	}
});