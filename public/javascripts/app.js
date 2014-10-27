angular.module('BlogApp',['ui.router','textAngular','ngSanitize','angular-loading-bar'])


.config(function  ($stateProvider,$urlRouterProvider,$httpProvider,cfpLoadingBarProvider) {
	// body...
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home',{
			resolve: {
				posts: function  (Post) {
					return Post.content.getAll();
				}
			},
			url:'/home',
			templateUrl:'/templates/home.ejs',
			controller:'HomeController'
		})
		.state('about',{
			url:'/about',
			templateUrl:'/templates/about.ejs'
		})
		.state('contact',{
			url:'/contact',
			templateUrl:'/templates/contact.ejs'
		})
		.state('signin',{
			url:'/signin',
			templateUrl:'/templates/signin.ejs',
			controller:'SignInController'
		})
		.state('post',{
			url:'/posts/:id',
			templateUrl:'/templates/post.ejs',
			controller:'PostController'
		})
		.state('addPost',{
			url:'/addPost',
			templateUrl:'/templates/addPost.ejs',
			controller:'AddPostController'
		})
		.state('signup',{
			url:'/signup',
			templateUrl:'/templates/signup.ejs',
			controller:'SignUpController'
		})
		;
		$httpProvider.interceptors.push('authInterceptor');

		 cfpLoadingBarProvider.includeSpinner = false;

});
