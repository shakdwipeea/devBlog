angular.module('BlogApp')
.controller('SignUpController', ['$scope','authentication', function($scope,authentication){
	$scope.signup = function  () {
		if (!$scope.user || !$scope.email || !$scope.password) {return;};
		authentication.signup($scope.user);
		authentication.signin({username:$scope.user.name,password:$scope.user.password});
	}

	$scope.checkUsername = function  () {
		var Users = [];
		
		authentication.getUsers($scope.user.name).then(function  (data) {
			console.log('Data received',data.data);
			$scope.duplicate = data.data.result;

		});

		
	}
}]);