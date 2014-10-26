angular.module('BlogApp')
.controller('SignUpController', ['$scope','authentication', function($scope,authentication){
	$scope.signup = function  () {
		console.log('Going t sign up',$scope.user);
		if (!$scope.user || !$scope.user.email || !$scope.user.password) {return;};
		console.log('Going to sign up');
		authentication.signup($scope.user);
		authentication.signin({username:$scope.user.name,password:$scope.user.password});
	};

	$scope.checkUsername = function  () {
		var Users = [];
		
		authentication.getUsers($scope.user.name).then(function  (data) {
			console.log('Data received',data.data);
			$scope.duplicate = data.data.result;
			if ($scope.duplicate == false) {$scope.message = 'Invalid username'};
		});

	
	};

	$scope.checkEmail = function  () {
		console.log('checkin');
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!re.test($scope.user.email)) {
			$scope.duplicateEmail = false;
			$scope.message = 'Invalid email';
		} else {
			$scope.duplicateEmail = true;
			$scope.message = '';
		}
	}


}]);