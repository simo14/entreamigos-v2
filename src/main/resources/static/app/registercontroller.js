angular.module("webapp").controller("registercontroller", registercontroller)

registercontroller.$inject = ["actorservice","$location","$routeParams"];

function registercontroller (actorservice,$location,$routeParams){
	var vm = this;
	vm.persona = {};
	vm.upersona = {};
	vm.newOrg = {};
	
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