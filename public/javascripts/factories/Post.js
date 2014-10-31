angular.module('BlogApp')
.factory('Post',function  ($http,$rootScope,alertify) {
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
		 return $http.post('/secure/posts',Post)
		 .success(function  (data) {
			content.posts.push(data);
		 })
		 .error(function  (data,status,headers,config) {
		 	console.log(data);
		 })
		 ;
	}

	content.edit = function  (Post) {
		// body...
		$http.post('/secure/edit',Post);
	}

	content.delete = function  (Post,index) {
		// body...
		console.log(Post);
		$http.post('/secure/delete',Post)
		.success(function  (data) {		
		})
		.error(function  (data) {
			// body...
			alertify.alertify.error('Some error occured while deleting your post');
		});
	}


	return {
		content: content
	}
});
