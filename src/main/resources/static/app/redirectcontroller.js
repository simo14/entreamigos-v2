angular.module("webapp").controller("redirectcontroller", redirectcontroller);
ppcontroller.$inject = ["$location","$scope"];

function redirectcontroller(ppservice,$location,$routeParams,$scope) {
	var vm = this;
    

    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
    	$location.path(absOldUrl);   
    	});

}
