angular.module('BlogApp')
.controller('AddPostController',function  ($scope,Post,$state,$rootScope) {
	// body
	$scope.htmlcontent = '<p>';

	$scope.test = 'ok';
	$scope.post = function  () {
		if (!$scope.title) {return;}

		Post.content.create({
			title:$scope.title,
			subtitle:$scope.subtitle,
			author:$rootScope.name,
			content:$scope.content,
			date: new Date()
		});
		
		console.log($scope.title);

		$state.go('home');

	}

	$scope.addHeading = function  () {
		console.log('here');
		$scope.content += "<h1 class='section-heading'></h1>";
	};

	$scope.textentered = function ($event) {
		console.log($event.key)
		if($event.key == "Enter"){
			$scope.htmlcontent += '</p><p>'
		}

		else if($event.key == 'Backspace') {
			$scope.htmlcontent = $scope.htmlcontent.substr(0,$scope.htmlcontent.length - 1);
		}

		else if($event.key != "Enter" && $event.key != undefined)
			$scope.htmlcontent += $event.key;

	}
	
});
