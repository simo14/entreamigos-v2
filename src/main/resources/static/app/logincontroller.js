angular.module("webapp").controller("logincontroller", logincontroller);
logincontroller.inject = ["$location","$resource"];

function logincontroller() {
	var PeopleResource = $resource('/people/name/:name',
			{ name : '@name' },
			{ update : { method : "PUT" }}
		);
		
	vm.name = "";
	vm.id = 0;
	
	vm.id = PeopleResource.get({ id: name }, function() {
		    return person.id
		  });
    vm.submit = function(event) {
    	alert("Has iniciado sesión");
		$location.path("/");
	};
}