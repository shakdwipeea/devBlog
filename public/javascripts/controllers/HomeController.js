angular.module('BlogApp')
.controller('HomeController',function  ($scope,Post) {
		$scope.posts = Post.content.posts;
		
});