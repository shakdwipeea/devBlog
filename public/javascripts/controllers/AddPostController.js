angular.module('BlogApp')
.controller('AddPostController',function  ($scope,Post,$state,$rootScope,$stateParams,Socket) {
	// body
	console.log($stateParams.id);
	if ($stateParams.id === undefined || $stateParams.id === '') {
		$scope.message = '';
		$scope.disable = false;
	} else  {
		console.log(Post.content.posts);
		$scope.title = Post.content.posts[$stateParams.id].title;
		$scope.subtitle = Post.content.posts[$stateParams.id].subtitle;
		$scope.content = Post.content.posts[$stateParams.id].content;
	}
	
	$scope.post = function  () {
	console.log($scope.content);
		if (!$scope.title|| !$scope.subtitle || !$scope.content ) {
			console.log($scope.content);
			return;
		} else {

			$scope.disable = true;
			if (!$scope.title) {return;}

			if ($stateParams.id !== undefined && $stateParams.id !== '') {
				Post.content.edit({
					title:$scope.title,
					subtitle:$scope.subtitle,
					author:$rootScope.name,
					content:$scope.content,
					date: new Date(),
					_id: Post.content.posts[$stateParams.id]._id
				});
				Socket.on('update',function  () {
					Post.content.getAll();
				});
				$state.go('home');
			} else {
				var result = Post.content.create({
				title:$scope.title,
				subtitle:$scope.subtitle,
				author:$rootScope.name,
				content:$scope.content,
				date: new Date()
			});
			
			result.then(function  (data) {
				// body..	
				Socket.on('newPost',function  () {
					Post.content.getAll();
				});
				$state.go('home');
			},function  (data) {
				$scope.message = data.data;
				
			});
			}

			
			$scope.disable = false;
			

			//$state.go('home');
		}

	}


	
});
