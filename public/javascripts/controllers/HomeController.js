angular.module('BlogApp')
.controller('HomeController',function  ($scope,Post) {
		$scope.posts = Post.content;

		//var d = new Date(Post.content.posts[2].date);
		//console.log(JSON.parse(Post.content.posts[2].date));
});
