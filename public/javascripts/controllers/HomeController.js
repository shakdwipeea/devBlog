angular.module('BlogApp')
.controller('HomeController',function  ($scope,Post) {
		var cur = 3;
		$scope.disable = false;

		$scope.posts = Post.content.posts.slice(0,cur);
		

		$scope.loadMore = function  () {
			// body...
			cur += 3;
			if (cur >= Post.content.posts.length) {
				$scope.disable = true;
			};
			$scope.posts = Post.content.posts.slice(0,cur);

			console.log($scope.disable);
		}
		//var d = new Date(Post.content.posts[2].date);
		//console.log(JSON.parse(Post.content.posts[2].date));
});
