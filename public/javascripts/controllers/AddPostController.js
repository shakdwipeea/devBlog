angular.module('BlogApp')
.controller('AddPostController',function  ($scope,Post,$state) {
	// body
	$scope.test = 'ok';
	$scope.post = function  () {
		if (!$scope.title) {return;}

		Post.content.create({
			title:$scope.title,
			subtitle:$scope.subtitle,
			author:$scope.author,
			content:$scope.content
		});
		
		console.log($scope.title);

		$state.go('home');
	}

});