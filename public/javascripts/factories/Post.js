angular.module('BlogApp')
.factory('Post',function  ($http,$rootScope) {
	var content = {
		posts: []
	};

	var renderDate = function (posts) {
	for (var i = 0; i < posts.length; i++) {
		posts[i].date = new Date(posts[i].date).toDateString();
	};
	return posts;
	};

	content.getAll = function  () {
		var url = '/posts';
		if ($rootScope.name) {
			url = '/postof/' + $rootScope.name;
		};
		return $http.get(url).success(function (data) {
			console.log("hello",url);
			data = renderDate(data);
			angular.copy(data,content.posts);
			console.log('Here',content.posts);
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
