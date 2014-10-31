angular.module('BlogApp')
.factory('Socket', ['$rootScope', function($rootScope){
	var socket = io.connect();
	return {
		on: function  (eventName,callBack) {
			socket.on(eventName,function  () {
				$rootScope.$apply(function  () {
					callBack.apply(socket,arguments);
				});
			})
		},

		emit: function  (eventName,data,callBack) {
			 socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		}
	}
}])