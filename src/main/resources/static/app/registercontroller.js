angular.module("webapp").controller("registercontroller", registercontroller)

registercontroller.$inject = ["actorservice", "$routeParams"];

function registercontroller (actorservice,$routeParams){
	var vm = this;
	vm.persona = {};
	vm.newOrg = {};
	
	
	vm.addPersona = function(persona) {
		
		actorservice.newPersona(persona);
		
		vm.newPersona = {};
		
		$location.path("/people");
	};
}