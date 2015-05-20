angular.module("webapp").config(RouteConfig);

RouteConfig.$inject = [ '$routeProvider' ];

function RouteConfig($routeProvider) {

	$routeProvider.when('/', { templateUrl : "templates/eventsList.html" });
	$routeProvider.when('/gente', { templateUrl : "templates/peopleList.html" });
	$routeProvider.when('/event/:id', { templateUrl : "templates/eventDetail.html" });
	$routeProvider.when('/person/:id', { templateUrl : "templates/personDetail.html" });
	$routeProvider.when('/login', { templateUrl : "templates/login.html" });

}