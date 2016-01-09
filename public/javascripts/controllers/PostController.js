angular.module('BlogApp')
.controller('PostController',function  ($scope,Post,$stateParams) {
	// body...
	console.log(Post.content.posts, $stateParams.id);
	$scope.post = Post.content.posts[$stateParams.id];
	if(Post.content.posts.length === 0) {
        console.log("Getting all posts");
        Post.content.getAll()
        	.then(function  (response) {
        		$scope.post = Post.content.posts[$stateParams.id];
        	})
    }
});