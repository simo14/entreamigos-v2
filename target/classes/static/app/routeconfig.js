angular.module("webapp").config(RouteConfig);

RouteConfig.$inject = [ '$routeProvider' ];

function RouteConfig($routeProvider) {

	$routeProvider.when('/', { templateUrl : "templates/eventsList.html" });
	$routeProvider.when('/gente', { templateUrl : "templates/peopleList.html" });
	$routeProvider.when('/event/:id', { templateUrl : "templates/eventDetail.html" });
	$routeProvider.when('/people/:id', { templateUrl : "templates/personDetail.html" });
	$routeProvider.when('/login', { templateUrl : "templates/login.html" });
	$routeProvider.when('/registerPerson', {templateUrl : "templates/register.html"});
	$routeProvider.when('/registerOrganization', {templateUrl: "templates/organizationRegister.html"});
	$routeProvider.when('/myAccount', {templateUrl: "templates/myaccount.html"});
}