angular.module("webapp").controller("logincontroller", logincontroller);
logincontroller.inject = ["$location","$resource"];

function logincontroller($resource,$location) {
	var vm = this;
	var PeopleResource = $resource('/people/name/:name',
			{ name : '@name' },
			{ update : { method : "PUT" }}
		);
		
	vm.name = "";
	vm.id = 0;
	
    vm.submit = function() {
    	vm.id = PeopleResource.get({ name : vm.name }, function() {
		    return person.id
		  });
    	alert("Has iniciado sesión");
		$location.path("/");
	};
}