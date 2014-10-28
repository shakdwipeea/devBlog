angular.module('BlogApp')
.controller('AddPostController',function  ($scope,Post,$state,$rootScope) {
	// body
	$scope.message = '';
	$scope.disable = false;
	$scope.post = function  () {
	console.log($scope.content);
		if (!$scope.title|| !$scope.subtitle || !$scope.content ) {
			console.log($scope.content);
			return;
		} else {

			$scope.disable = true;
			if (!$scope.title) {return;}

			var result = Post.content.create({
				title:$scope.title,
				subtitle:$scope.subtitle,
				author:$rootScope.name,
				content:$scope.content,
				date: new Date()
			});
			
			result.then(function  (data) {
				// body..	
				$state.go('home');
			},function  (data) {
				$scope.message = data.data;
			});

			

			//$state.go('home');
		}

	}


	
});
