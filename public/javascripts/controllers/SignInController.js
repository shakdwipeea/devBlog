angular.module('BlogApp')
.controller('SignInController',function  ($scope,$http,$window,authentication) {
	// body...
	$scope.submit = function  () {
		console.log('Submit');
		authentication.signin($scope.user);
		$scope.message = authentication.auth;
	}
});