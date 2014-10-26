angular.module('BlogApp')
.factory('authentication',function  ($http,$window,$state,$rootScope) {
	var auth = {
		name: '',
		message: ''
	};
	var signin = function  (user) {
		$http
			.post('/authenticate',user)
			.success(function  (data,status,headers,config) {
				$window.sessionStorage.token = data.token;
				$rootScope.loggedIn = true;

				$http.get('/secure/prof')
				.success(function  (data,status,headers,config) {
					// body...
					$rootScope.name = data;
					console.log(data);
					$window.sessionStorage.username = data;
					$state.go('home');
				});

				

			})
			.error(function  (data,status,headers,config) {
				delete $window.sessionStorage.token;
				console.log('eroor');

				var au = {
					message : 'Error: Invalid username or password'
				}
				$rootScope.loggedIn = false;
				angular.copy(au,auth);
				console.log(auth);
			});

	};

	var logout = function  () {
		delete $window.sessionStorage.token;
		delete $window.sessionStorage.username;
		$rootScope.loggedIn = false;
		$rootScope.name = '';
		$state.go('home');
	}

	var signup = function  (user) {
		$http
		.post('/newuser',user)
		.success(function  (data,status,headers,config) {
			
		})
		.error(function  (data,status,headers,config) {
			// body...

		});
	}

	var getUsers = function  (username) {
		// body...
		console.log('In getUsers');
		return $http.post('/users',{name: username});
	}
	return {
		signin: signin,
		auth: auth,
		logout: logout,
		signup: signup,
		getUsers: getUsers
	};
});