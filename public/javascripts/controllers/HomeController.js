angular.module('BlogApp')
.controller('HomeController',
    /**
     *
     * @param $scope
     * @param Post
     * @param alertify
     * @param $state
     * @param Socket
     * @param {Object} $stateParams State parameters passed.
     * @param {String} $stateParams.userName UserName used
     */
    function  ($scope,Post,alertify,$state,Socket, $stateParams) {
		$scope.cur = 3;
		$scope.disable = false;

		$scope.posts = Post.content;
		
		Socket.on('update',function  () {
			Post.content.getAll()
                .then(function (response) {
                    filterPostsByAuthor();
                });
		});

        console.log("Usernme is", '"' + $stateParams.userName + '"');

	    if (Post.content.posts.length == 0) {
            Post.content.getAll()
                .then(function (response) {
                    filterPostsByAuthor();
                });
        }

        function filterPostsByAuthor () {
            if ($stateParams.userName) {
                $scope.posts.posts = $scope.posts.posts.filter(function (post) {
                    return post.author === '"' + $stateParams.userName + '"';
                });
                console.log("filter", $scope.posts);
            }
        }

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
