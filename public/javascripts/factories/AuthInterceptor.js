angular.module('BlogApp')
.factory('authInterceptor',function  ($rootScope,$q,$window) {
	return {
		request: function  (config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
			}
			return config;
		},
		response: function  (response) {
			if (response.status === 401) {
				//user not authorized
			}
			return response || $q.when(response);
		}
	};
});