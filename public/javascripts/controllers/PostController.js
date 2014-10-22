angular.module('BlogApp')
.controller('PostController',function  ($scope,Post,$stateParams) {
	// body...
	console.log(Post.content.posts);
	$scope.post = Post.content.posts[$stateParams.id];
});