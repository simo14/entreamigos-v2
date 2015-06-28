angular.module("webapp").controller("redirectcontroller", redirectcontroller);
redirectcontroller.$inject = ["$location","$scope","sessionservice"];

function redirectcontroller($location,$scope,sessionservice) {
	var vm = this;
	console.log("estoy en redirect");
	$location.path("/");
    //$scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
    //	$location.path(absOldUrl);   
    //});
    
}
