angular.module('BlogApp')
.controller('AddPostController',function  ($scope,Post,$state,$rootScope) {
	// body
	$scope.disable = false;
	$scope.post = function  () {
console.log($scope.content);
		if (!$scope.title|| !$scope.subtitle || !$scope.content ) {
			console.log($scope.content);
			return;
		} else {

			$scope.disable = true;
			if (!$scope.title) {return;}

			Post.content.create({
				title:$scope.title,
				subtitle:$scope.subtitle,
				author:$rootScope.name,
				content:$scope.content,
				date: new Date()
			});
			
			console.log($scope.title);

			$state.go('home');
		}

	}


	
});
