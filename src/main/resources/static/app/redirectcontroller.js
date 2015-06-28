angular.module("webapp").controller("redirectcontroller", redirectcontroller);
ppcontroller.$inject = ["$location","$scope","sessionservice"];

function redirectcontroller($location,$scope,sessionservice) {
	var vm = this;
	
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
    	$location.path(absOldUrl);   
    });
    
}
