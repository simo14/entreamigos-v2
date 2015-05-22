angular.module("webapp").controller("registercontroller", registercontroller)

registercontroller.$inject = ["actorservice","$location","$routeParams"];

function registercontroller (actorservice,$location,$routeParams){
	var vm = this;
	vm.persona = {};
	vm.upersona = {};
	vm.newOrg = {};
	vm.logged = {};
	
	var pene = actorservice.isLogged();
				vm.logged = pene;
				vm.modifyPerson = function(upersona){
					console.log("h");
					vm.logged = actorservice.updatePersona(upersona);
					vm.upersona = {};
					$location.path("/");
				}
				
				console.log("reputa"+vm.logged);
	
	
	vm.addPersona = function(persona) {
		
		actorservice.newPersona(persona);
		
		vm.newPersona = {};
		
		$location.path("/gente");
	};
	
	vm.addOrg = function(org) {
		
		actorservice.newOrg(org);
		
		vm.newOrg = {};
		
		$location.path("/");
	};
}