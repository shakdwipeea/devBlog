angular.module('BlogApp')
.controller('SignUpController', ['$scope','authentication', function($scope,authentication){
	$scope.signup = function  () {
		if (!$scope.user) {return;};

		authentication.signup($scope.user);
		authentication.signin({username:$scope.user.name,password:$scope.user.password});
	}
}]);