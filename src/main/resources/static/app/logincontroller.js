angular.module("webapp").controller("logincontroller", logincontroller);
logincontroller.inject = ["$location","$resource"];

function logincontroller($resource,$location) {
	var vm = this;
	var PeopleResource = $resource('/people/login/:name',
			{ name : '@name' },
			{ update : { method : "PUT" }}
		);
		
	vm.name = "";
	vm.id = 0;
	
    vm.submit = function() {
    	PeopleResource.get({name : vm.name});
    	alert("Has iniciado sesión");
		$location.path("/");
	};
}