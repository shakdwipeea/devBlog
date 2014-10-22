angular.module('BlogApp')
.factory('Post',function  ($http) {
	var content = {
		posts: []
	};

	content.getAll = function  () {
			return $http.get('/posts').success(function (data) {
				console.log("hello");
				angular.copy(data,content.posts);
			});
	};

	content.create = function  (Post) {
		// body...
		return $http.post('/secure/posts',Post).success(function  (data) {
			content.posts.push(data);
		});
	}
	return {
		content: content
	}
});