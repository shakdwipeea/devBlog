angular.module('BlogApp')

    .directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                	console.log(elm[0]);
                    if(v){
                    	//elm[0].addClass('show');
                        //elm[0].show();
                        $(elm).show();
                    }else{
                    	//elm[0].addClass('hide');
                        //elm[0].hide();
                        $(elm).hide();
                    }
                });
            }
        };

    }]);