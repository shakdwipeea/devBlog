angular.module('BlogApp')
.controller('HomeController',function  ($scope,Post,alertify,$state,Socket) {
		$scope.cur = 3;
		$scope.disable = false;

		$scope.posts = Post.content;
		
		Socket.on('update',function  () {
			Post.content.getAll();
		});

		$scope.loadMore = function  () {
			// body...
			$scope.cur += 3;
			if ($scope.cur >= Post.content.posts.length) {
				$scope.disable = true;
			};
			

			console.log($scope.disable);
		}

		$scope.editPost = function  (index) {
			// body...
			console.log($scope.posts.posts[index]);
			$state.go('addPost',{id: index});
		}

		$scope.deletePost = function  (index) {
			console.log(index);
			// body...
			alertify.alertify.confirm('Going to delete').setting({
				'labels':{ok:'Alright!',cancel:'Naa!'},
				'onok': function () { 
					alertify.alertify.success('Deleting Post ..!!');
					Post.content.delete($scope.posts.posts[index],index);
				},
				'oncancel': function() { 
					alertify.alertify.error('Glad you changed your mind');
				}
			});
			
		}

		
});
